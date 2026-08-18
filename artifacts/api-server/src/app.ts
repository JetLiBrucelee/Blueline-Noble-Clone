import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { getPausedState } from "./routes/owner-control";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Global pause middleware.
 * When the site is paused, all /api routes return 503 EXCEPT:
 *   - /api/owner-control/* (so the owner can still restore)
 *   - /api/healthz         (deployment health probes must always return 200)
 */
app.use("/api", (req: Request, res: Response, next: NextFunction) => {
  if (getPausedState() && !req.path.startsWith("/owner-control") && req.path !== "/healthz") {
    res.status(503).json({ error: "Service temporarily unavailable" });
    return;
  }
  next();
});

app.use("/api", router);

export default app;
