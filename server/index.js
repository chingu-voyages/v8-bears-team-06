import express from "express";
import createPino from "pino";
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

const logger = createPino(); // Create logger instance

function createApolloServer() {
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
