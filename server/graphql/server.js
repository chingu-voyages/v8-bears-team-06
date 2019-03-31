import { ApolloServer } from "apollo-server-express";

import { logger } from "../../logger";
import { schema } from "./schema";

function getUser(token) {
  const user = { loggedIn: true };
  try {
    const decoded = jwt.verify(token, "secret");
  } catch (err) {
    user.loggedIn = false;
  }
  return user;
}

const publicOperations = ["login"];

export function createApolloServer() {
  const context = ({ req }) => {
    const contextObj = {};
    const token = req.headers.authorization || "";
    const user = getUser(token);
    if (!publicOperations.includes(req.body.operationName) && !user.loggedIn) {
      throw new AuthorizationError("you must be logged in");
    }
    contextObj.user = user;
    return contextObj;
  };
  return new ApolloServer({ schema, context });
}
