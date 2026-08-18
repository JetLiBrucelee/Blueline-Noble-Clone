import app from "./app";
import { logger } from "./lib/logger";
import { loadInitialPauseState } from "./routes/owner-control";

if (!process.env["JWT_SECRET"]) {
  throw new Error("JWT_SECRET environment variable is required but not set. Set it before starting the server.");
}

if (!process.env["ADMIN_EMAIL"] || !process.env["ADMIN_BCRYPT_HASH"]) {
  throw new Error("ADMIN_EMAIL and ADMIN_BCRYPT_HASH environment variables are required but not set.");
}

if (!process.env["OWNER_USERNAME"] || !process.env["OWNER_PASSWORD_HASH"] || !process.env["OWNER_JWT_SECRET"]) {
  throw new Error("OWNER_USERNAME, OWNER_PASSWORD_HASH, and OWNER_JWT_SECRET environment variables are required but not set.");
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

// Load the current pause state from DB before accepting requests.
loadInitialPauseState().then(() => {
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }
    logger.info({ port }, "Server listening");
  });
}).catch((err) => {
  logger.error({ err }, "Failed to load initial pause state");
  process.exit(1);
});
