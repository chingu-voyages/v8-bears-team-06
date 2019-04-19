import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";

import { schema } from "./schema";

export function getUser(token, secretKey) {
  let user;
  try {
    user = jwt.verify(token, secretKey);
  } catch (err) {
    user = null;
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
  const token = extractToken(req.headers.authorization);
  const user = getUser(token, secretKey);
  return { user, SECRET_KEY: secretKey };
};

export function createApolloServer(secretKey) {
  const context = createContext(secretKey);
  return new ApolloServer({ schema, context });
}
