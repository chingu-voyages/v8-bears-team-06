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
    email: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    profile: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve: authenticated(async (parent, args, context) => {
        const profile = await User.findOne({ email: args.email });
        return profile;
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

        return { token, email };
      }
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
        let user = new User({
          email: args.email,
          password: args.password
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
