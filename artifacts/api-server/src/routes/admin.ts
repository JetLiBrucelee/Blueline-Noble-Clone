import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import { db } from "@workspace/db";
import { siteSettingsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { ObjectStorageService } from "../lib/objectStorage";

const router: IRouter = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const ADMIN_EMAIL = "Timnord47@gmail.com";
const ADMIN_PASSWORD = "Darasimi0404";
const JWT_SECRET = process.env["JWT_SECRET"] || "blueline-admin-secret-2024";

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    jwt.verify(auth.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
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

router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (
    email?.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase() ||
    password !== ADMIN_PASSWORD
  ) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

router.get("/admin/settings", authMiddleware, async (_req, res) => {
  try {
    const rows = await ensureSettings();
    res.json(rows[0]);
  } catch (err) {
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
  } catch (err) {
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

    const { objectStorageClient } = await import("../lib/objectStorage");
    const { randomUUID } = await import("crypto");
    const ext = req.file.originalname.split(".").pop() || "jpg";
    const fileName = `${privateDir}/ceo-${randomUUID()}.${ext}`;
    const bucket = objectStorageClient.bucket(bucketId);
    const file = bucket.file(fileName);

    await file.save(req.file.buffer, {
      contentType: req.file.mimetype,
      resumable: false,
    });

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
