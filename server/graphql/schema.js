import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList
} from "graphql";
import jwt from "jsonwebtoken";
import { GraphQLDate } from "graphql-iso-date";

import { User } from "../models/user";
import { Work } from "../models/work";
import { authenticated } from "./middleware";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    works: {
      type: WorkType,
      args: {},
      resolve: (parent, args, context, info) => {
        return [];
      }
    }
  })
});

const AuthDataType = new GraphQLObjectType({
  name: "AuthData",
  fields: () => ({
    token: { type: GraphQLString }
  })
});

const WorkType = new GraphQLObjectType({
  name: "Work",
  fields: () => ({
    title: { type: GraphQLString },
    startDate: { type: GraphQLDate },
    endDate: { type: GraphQLDate },
    description: { type: GraphQLString },
    thoughts: { type: GraphQLString },
    link: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    login: {
      type: AuthDataType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid credential");
        }
        // TODO: use bycrpt instead
        if (user.password !== password) {
          throw new Error("Invalid credential");
        }
        const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
          expiresIn: "1h"
        });
        return { token };
      }
    },
    works: {
      type: new GraphQLList(WorkType),
      resolve: authenticated(async(parent, args, context) => {
        const showWorks = await Work.find({});
        return showWorks;
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

    addWork: {
      type: WorkType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        startDate: { type: new GraphQLNonNull(GraphQLString) },
        endDate: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        thoughts: { type: GraphQLString },
        link: { type: GraphQLString }
      },
      resolve: authenticated(async(parent, args, context) => {
        let work = new Work({
          title: args.title,
          startDate: args.startDate,
          endDate: args.endDate,
          description: args.description,
          thoughts: args.thoughts,
          link: args.link
        });
        return work.save();
      })
    }
  }
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
