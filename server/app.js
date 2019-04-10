import { insertMockData, setupDbConnection } from "./db";
import { createApolloServer } from "./graphql/server";
import { logger } from "./logger";

const dev = process.env.NODE_ENV !== "production";
const JWT_SECRET_KEY =
  process.env.JWT_SECRET_KEY || "SHOULD_NOT_USE_THIS_IN_PRODUCTION";

export async function createServer() {
  const server = createApolloServer(JWT_SECRET_KEY);

  try {
    await setupDbConnection(dev);
    if (dev) {
      insertMockData();
    }
  } catch (err) {
    logger.error(err);
    return;
  }

  return server;
}
