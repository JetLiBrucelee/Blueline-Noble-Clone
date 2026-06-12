import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import { db } from "@workspace/db";
import { siteSettingsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { objectStorageClient } from "../lib/objectStorage";
import { randomUUID } from "crypto";

const router: IRouter = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

function getJwtSecret(): string {
  const secret = process.env["JWT_SECRET"];
  if (!secret) throw new Error("JWT_SECRET environment variable is required but not set");
  return secret;
}

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const payload = jwt.verify(auth.slice(7), getJwtSecret()) as jwt.JwtPayload;
    if (payload?.role !== "admin") {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

async function ensureSettings() {
  const existing = await db.select().from(siteSettingsTable).where(eq(siteSettingsTable.id, 1));
  if (existing.length === 0) {
    await db.insert(siteSettingsTable).values({
      id: 1,
      ceoName: "Jeffrey Anderson",
      ceoImageUrl: "/ceo-jeffrey-anderson.jpg",
      phone: "(774) 564-8357",
      hqAddress: "42 Broadway",
      hqCity: "New York, NY 10004",
    });
  }
  return db.select().from(siteSettingsTable).where(eq(siteSettingsTable.id, 1));
}

// Bcrypt hash is derived once at first login from ADMIN_PASSWORD secret and cached.
// Login always uses bcrypt.compare — password is never stored or compared in plaintext.
let _passwordHash: string | null = null;

async function getAdminPasswordHash(): Promise<string> {
  if (_passwordHash) return _passwordHash;
  const plain = process.env["ADMIN_PASSWORD"];
  if (!plain) throw new Error("ADMIN_PASSWORD secret is required but not set");
  _passwordHash = await bcrypt.hash(plain, 12);
  return _passwordHash;
}

router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  const adminEmail = process.env["ADMIN_EMAIL"];
  if (!adminEmail || !process.env["ADMIN_PASSWORD"]) {
    res.status(500).json({ error: "Admin credentials not configured" });
    return;
  }

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const emailMatch = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
  const hash = await getAdminPasswordHash();
  const passwordMatch = await bcrypt.compare(password, hash);

  if (!emailMatch || !passwordMatch) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = jwt.sign({ role: "admin" }, getJwtSecret(), { expiresIn: "7d" });
  res.json({ token });
});

router.get("/admin/settings", authMiddleware, async (_req, res) => {
  try {
    const rows = await ensureSettings();
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: "Failed to load settings" });
  }
});

router.put("/admin/settings", authMiddleware, async (req, res) => {
  try {
    const { ceoName, phone, hqAddress, hqCity, ceoImageUrl } = req.body as {
      ceoName?: string;
      phone?: string;
      hqAddress?: string;
      hqCity?: string;
      ceoImageUrl?: string;
    };
    await ensureSettings();
    const updates: Partial<typeof siteSettingsTable.$inferInsert> = {};
    if (ceoName !== undefined) updates.ceoName = ceoName;
    if (phone !== undefined) updates.phone = phone;
    if (hqAddress !== undefined) updates.hqAddress = hqAddress;
    if (hqCity !== undefined) updates.hqCity = hqCity;
    if (ceoImageUrl !== undefined) updates.ceoImageUrl = ceoImageUrl;

    const rows = await db.update(siteSettingsTable).set(updates).where(eq(siteSettingsTable.id, 1)).returning();
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: "Failed to update settings" });
  }
});

router.post("/admin/upload/ceo-image", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    const bucketId = process.env["DEFAULT_OBJECT_STORAGE_BUCKET_ID"];
    const privateDir = process.env["PRIVATE_OBJECT_DIR"] || "uploads";
    if (!bucketId) {
      res.status(500).json({ error: "Object storage not configured" });
      return;
    }

    const ext = req.file.originalname.split(".").pop() || "jpg";
    const fileName = `${privateDir}/ceo-${randomUUID()}.${ext}`;
    const bucket = objectStorageClient.bucket(bucketId);
    const file = bucket.file(fileName);

    await file.save(req.file.buffer, { contentType: req.file.mimetype, resumable: false });
    await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucketId}/${fileName}`;

    await ensureSettings();
    const rows = await db
      .update(siteSettingsTable)
      .set({ ceoImageUrl: publicUrl })
      .where(eq(siteSettingsTable.id, 1))
      .returning();

    res.json({ url: publicUrl, settings: rows[0] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

export default router;
