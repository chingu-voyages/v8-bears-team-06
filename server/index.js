import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import next from 'next';

import {insertMockData, setupDbConnection} from './db';
import {schema} from './graphql/schema';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev, dir: './client'});
const nextHandler = nextApp.getRequestHandler();

function createApolloServer() {
  return new ApolloServer({schema});
}

export default async function main() {
  await nextApp.prepare();

  const server = express();

  const apolloServer = createApolloServer();
  apolloServer.applyMiddleware({app: server});

  try {
    await setupDbConnection(dev);
    if (dev) {
      insertMockData();
    }
  } catch (err) {
    console.error(err);
    return;
  }

  // all requests to paths other than `/graphql` are processed by Nextjs
  server.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
}
