import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType
} from "graphql";
import jwt from "jsonwebtoken";
import { GraphQLDate } from "graphql-iso-date";

import { User } from "../models/user";
import { Work } from "../models/work";
import { authenticated } from "./middleware";

const WorkType = new GraphQLObjectType({
  name: "WorkType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    startDate: { type: GraphQLDate },
    endDate: { type: GraphQLDate },
    description: { type: GraphQLString },
    thoughts: { type: GraphQLString }
  })
});

const WorkInputType = new GraphQLInputObjectType({
  name: "WorkInput",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    startDate: { type: GraphQLDate },
    endDate: { type: GraphQLDate },
    description: { type: GraphQLString },
    thoughts: { type: GraphQLString }
  }
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    workType: { type: GraphQLString },
    skills: { type: new GraphQLList(GraphQLString) },
    tagline: { type: GraphQLString },
    statement: { type: GraphQLString },
    experience: { type: GraphQLString },
    imageId: { type: GraphQLString },
    signupDate: { type: GraphQLDate },
    password: { type: GraphQLString },
    works: {
      type: new GraphQLList(WorkType),
      resolve: async ({ id }) => {
        const works = await Work.find({ userId: id });
        return works;
      }
    }
  })
});

const AuthDataType = new GraphQLObjectType({
  name: "AuthData",
  fields: () => ({
    token: { type: GraphQLString },
    email: { type: GraphQLString },
    id: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    profileCards: {
      type: new GraphQLList(UserType),
      resolve: authenticated(async (parent, args, context) => {
        const user = await User.find({}).select(
          "name workType skills tagline imageId id"
        );
        return user;
      })
    },
    login: {
      type: AuthDataType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: async (parent, { email, password }, { SECRET_KEY }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid credential");
        }
        // TODO: use bycrpt instead
        if (user.password !== password) {
          throw new Error("Invalid credential");
        }
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
          expiresIn: "1h"
        });
        const id = user._id;

        return { token, email, id };
      }
    },
    profileById: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: authenticated(async (parent, { id }) => {
        const profile = await User.findById(id);
        if (!User) {
          throw new Error("Profile not found");
        }
        return profile;
      })
    },
    workById: {
      type: WorkType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: authenticated(async (parent, { id }) => {
        const work = await Work.findById(id);
        if (!work) {
          throw new Error("Work not found");
        }
        return work;
      })
    },
    searchWorks: {
      type: new GraphQLList(WorkType),
      args: {
        query: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: authenticated(
        async (parent, { query }, { workSearchService }) => {
          const works = await workSearchService.search(query);
          return works;
        }
      )
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        const check = await User.findOne({ email: args.email });
        if (check) {
          return { email: "taken", password: "anything" };
        } else if (args.email.length === 0) {
          return { email: "empty", password: "anything" };
        }
        const signupDate = new Date();

        let user = new User({
          email: args.email,
          password: args.password,
          signupDate: signupDate
        });
        return user.save();
      }
    },
    addProfile: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        workType: { type: GraphQLString },
        skills: { type: new GraphQLList(GraphQLString) },
        tagline: { type: GraphQLString },
        statement: { type: GraphQLString },
        experience: { type: GraphQLString }
      },
      resolve: authenticated(async (parent, args, context) => {
        const query = { email: args.email };
        const profile = await User.findOneAndUpdate(query, {
          $set: {
            name: args.name,
            location: args.location,
            workType: args.workType,
            skills: args.skills,
            tagline: args.tagline,
            statement: args.statement,
            experience: args.experience
          }
        });
        return profile;
      })
    },
    addImage: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        imageId: { type: GraphQLString }
      },
      resolve: authenticated(async (parent, args, context) => {
        const query = { _id: args.id };
        const profile = await User.findOneAndUpdate(query, {
          $set: {
            imageId: args.imageId
          }
        });
        return profile;
      })
    },
    workCreate: {
      type: WorkType,
      args: {
        work: { type: new GraphQLNonNull(WorkInputType) }
      },
      resolve: authenticated(async (parent, { work: workInput }, context) => {
        const { title, startDate, endDate, description, thoughts } = workInput;
        const work = await Work.create({
          userId: context.user.id,
          title,
          startDate,
          endDate,
          description,
          thoughts
        });
        return work;
      })
    },
    workUpdate: {
      type: WorkType,
      args: {
        id: { type: GraphQLString },
        work: { type: new GraphQLNonNull(WorkInputType) }
      },
      resolve: authenticated(
        async (parent, { id, work: workInput }, context) => {
          const work = await Work.findById(id);
          if (!work) {
            throw new Error(`Work with id ${id} not found`);
          }
          if (context.user.id !== work.userId) {
            throw new Error("Not authorized to update this work");
          }
          Object.assign(work, workInput);
          work.save();
          return work;
        }
      )
    }
  }
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
