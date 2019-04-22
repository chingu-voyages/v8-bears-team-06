import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";

import { schema } from "./schema";

export function getUser(token, secretKey) {
  const user = { loggedIn: true };
  try {
    jwt.verify(token, secretKey);
  } catch (err) {
    user.loggedIn = false;
  }
  return user;
}

export function extractToken(authorization) {
  const authHeader = authorization || "";
  let token = "";
  if (authHeader !== "") {
    const authHeaderElements = authHeader.split(" ");
    if (authHeaderElements.length === 2) {
      token = authHeaderElements[1];
    }
  }
  return token;
}

export const createContext = secretKey => ({ req }) => {
  const contextObj = {};
  const token = extractToken(req.headers.authorization);
  const user = getUser(token, secretKey);
  contextObj.user = user;
  contextObj.SECRET_KEY = secretKey;
  return contextObj;
};

export function createApolloServer(secretKey) {
  const context = createContext(secretKey);
  return new ApolloServer({ schema, context });
}
