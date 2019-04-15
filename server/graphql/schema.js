import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList
} from "graphql";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { Profile } from "../models/profile";
import { authenticated } from "./middleware";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

const ProfileType = new GraphQLObjectType({
  name: "Profile",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    location: { type: GraphQLString },
    workType: { type: GraphQLString },
    skills: { type: new GraphQLList(GraphQLString) },
    tagline: { type: GraphQLString },
    statement: { type: GraphQLString },
    experience: { type: GraphQLString }
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
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: authenticated((parent, args) => {
        return User.findById(args.id);
      })
    },
    profile: {
      type: ProfileType,
      args: { email: { type: GraphQLString } },
      resolve: authenticated(async (parent, args, context) => {
        const profile = await Profile.findOne({ email: args.email });
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

        return { token: token, email: email };
      }
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
      type: ProfileType,
      args: {
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        location: { type: GraphQLString },
        workType: { type: GraphQLString },
        skills: { type: new GraphQLList(GraphQLString) },
        tagline: { type: GraphQLString },
        statement: { type: GraphQLString },
        experience: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        let profile = new Profile({
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          location: args.location,
          workType: args.workType,
          skills: args.skills,
          tagline: args.tagline,
          statement: args.statement,
          experience: args.experience
        });
        return profile.save();
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
