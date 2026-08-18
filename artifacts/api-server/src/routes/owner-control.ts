import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { db } from "@workspace/db";
import { siteStatusTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

// In-memory cache of pause state — avoids a DB hit on every request.
// Exported so app.ts middleware can read it without a DB query.
let pausedCache: boolean | null = null;

// Bcrypt hash of the owner password, generated once at startup from OWNER_PASSWORD.
// Stored in memory only — never written to disk or .replit.
let ownerPasswordHashCache: string | null = null;

export function getPausedState(): boolean {
  // Default to false (site active) if not yet loaded from DB.
  return pausedCache ?? false;
}

export function setPausedState(value: boolean): void {
  pausedCache = value;
}

/**
 * Initialise owner state at startup:
 * 1. Hash OWNER_PASSWORD with bcrypt and cache in memory.
 * 2. Load the current pause state from DB.
 * Throws on any failure — the server must not start with missing credentials or a broken DB.
 */
export async function loadInitialPauseState(): Promise<void> {
  const ownerPassword = process.env["OWNER_PASSWORD"];
  if (!ownerPassword) throw new Error("OWNER_PASSWORD is not set");

  // Hash once at startup; result lives only in process memory.
  ownerPasswordHashCache = await bcrypt.hash(ownerPassword, 12);

  // Do NOT catch DB errors here — a missing site_status table or DB failure
  // must cause startup to abort, not silently default to active.
  const rows = await db.select().from(siteStatusTable).where(eq(siteStatusTable.id, 1));
  if (rows.length === 0) {
    await db.insert(siteStatusTable).values({ id: 1, paused: false });
    pausedCache = false;
  } else {
    pausedCache = rows[0]!.paused;
  }
}

function getOwnerJwtSecret(): string {
  const secret = process.env["OWNER_JWT_SECRET"];
  if (!secret) throw new Error("OWNER_JWT_SECRET is not set");
  return secret;
}

function ownerAuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const payload = jwt.verify(auth.slice(7), getOwnerJwtSecret()) as jwt.JwtPayload;
    if (payload?.role !== "owner") {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Rate limit: max 10 login attempts per IP per 15 minutes.
const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Please try again later." },
});

/** POST /owner-control/login */
router.post("/owner-control/login", loginRateLimit, async (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };

  const ownerUsername = process.env["OWNER_USERNAME"];

  if (!ownerUsername || !ownerPasswordHashCache) {
    res.status(500).json({ error: "Owner credentials not configured" });
    return;
  }

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  const usernameMatch = username === ownerUsername;
  const passwordMatch = await bcrypt.compare(password, ownerPasswordHashCache);

  if (!usernameMatch || !passwordMatch) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ role: "owner" }, getOwnerJwtSecret(), { expiresIn: "4h" });
  res.json({ token });
});

/**
 * GET /owner-control/public-status
 * Always responds — exempt from the pause middleware.
 * Returns current pause state for the frontend gate.
 */
router.get("/owner-control/public-status", (_req, res) => {
  res.json({ paused: getPausedState() });
});

/** GET /owner-control/status — requires owner JWT */
router.get("/owner-control/status", ownerAuthMiddleware, async (_req, res) => {
  res.json({ paused: getPausedState() });
});

/** POST /owner-control/pause — requires owner JWT */
router.post("/owner-control/pause", ownerAuthMiddleware, async (_req, res) => {
  try {
    await db
      .update(siteStatusTable)
      .set({ paused: true, pausedAt: new Date() })
      .where(eq(siteStatusTable.id, 1));
    setPausedState(true);
    res.json({ paused: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

/** POST /owner-control/restore — requires owner JWT */
router.post("/owner-control/restore", ownerAuthMiddleware, async (_req, res) => {
  try {
    await db
      .update(siteStatusTable)
      .set({ paused: false, pausedAt: null })
      .where(eq(siteStatusTable.id, 1));
    setPausedState(false);
    res.json({ paused: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

export default router;
