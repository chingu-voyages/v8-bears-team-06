import { createServer } from "./app";
import { logger } from "./logger";

const port = parseInt(process.env.PORT, 10) || 3000;

async function main() {
  const server = await createServer();
  const { url } = await server.listen(port);
  logger.info(`> Ready on ${url}`);
}

main();
