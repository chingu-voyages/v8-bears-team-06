import { createExpressApp } from "./server";
import { logger } from "./logger";

const port = parseInt(process.env.PORT, 10) || 3000;

async function main() {
  const server = await createExpressApp();
  server.listen(port, err => {
    if (err) {
      throw err;
    }
    logger.info(`> Ready on http://localhost:${port}`);
  });
}

main();
