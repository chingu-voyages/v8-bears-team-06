import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";

import { schema } from "./schema";

function getUser(token, secretKey) {
  const user = { loggedIn: true };
  try {
    jwt.verify(token, secretKey);
  } catch (err) {
    user.loggedIn = false;
  }
  return user;
}

export function createApolloServer(secretKey) {
  const context = ({ req }) => {
    const contextObj = {};
    const token = req.headers.authorization || "";
    const user = getUser(token, secretKey);
    contextObj.user = user;
    contextObj.SECRET_KEY = secretKey;
    return contextObj;
  };
  return new ApolloServer({ schema, context });
}
