import express from "express";
import bodyParser from "body-parser";
import { ApolloServer, gql } from "apollo-server-express";
import next from "next";

import { insertMockData, setupDbConnection } from "./db";
import { schema } from "./graphql/schema";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "./client" });
const nextHandler = nextApp.getRequestHandler();

function createApolloServer() {
  return new ApolloServer({ schema });
}

export default async function main() {
  await nextApp.prepare();

  const server = express();
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
    console.error(err);
    return;
  }

  server.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
}
