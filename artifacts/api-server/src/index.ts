import app from "./app";
import { logger } from "./lib/logger";

if (!process.env["JWT_SECRET"]) {
  throw new Error("JWT_SECRET environment variable is required but not set. Set it before starting the server.");
}

if (!process.env["ADMIN_EMAIL"] || !process.env["ADMIN_PASSWORD_HASH"]) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD_HASH environment variables are required but not set.");
}

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
