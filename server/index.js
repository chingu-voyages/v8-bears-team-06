import express from "express";
import { logger } from "../logger";
import createExpressPino from "express-pino-logger";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import next from "next";

import { insertMockData, setupDbConnection } from "./db";
import { schema } from "./graphql/schema";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "./client" });
const nextHandler = nextApp.getRequestHandler();

function getUser(token) {
  const user = { loggedIn: true };
  try {
    const decoded = jwt.verify(token, "secret");
  } catch (err) {
    user.loggedIn = false;
  }
  return user;
}

function createApolloServer() {
  const context = ({ req }) => {
    const contextObj = {};
    const token = req.headers.authorization || "";
    contextObj.user = getUser(token);
    return contextObj;
  };
  return new ApolloServer({ schema });
}

export default async function main() {
  await nextApp.prepare();

  const server = express();
  const expressPino = createExpressPino({
    logger
  });
  server.use(expressPino);
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  const apolloServer = createApolloServer();
  apolloServer.applyMiddleware({ app: server });

  // all requests to paths other than `/graphql` are processed by Nextjs
  server.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  try {
    await setupDbConnection(dev);
    if (dev) {
      insertMockData();
    }
  } catch (err) {
    logger.error(err);
    return;
  }

  server.listen(port, err => {
    if (err) {
      throw err;
    }
    logger.info(`> Ready on http://localhost:${port}`);
  });
}
