import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";

import { schema } from "./schema";

function getUser(token) {
  const user = { loggedIn: true };
  try {
    jwt.verify(token, "secret");
  } catch (err) {
    user.loggedIn = false;
  }
  return user;
}

const publicOperations = ["login", "addUser"];

export function createApolloServer() {
  const context = ({ req }) => {
    const contextObj = {};
    const token = req.headers.authorization || "";
    const user = getUser(token);
    if (!publicOperations.includes(req.body.operationName) && !user.loggedIn) {
      throw new Error("you must be logged in");
    }
    contextObj.user = user;
    return contextObj;
  };
  return new ApolloServer({ schema, context });
}
