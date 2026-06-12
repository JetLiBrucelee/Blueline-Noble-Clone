import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { siteSettingsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const DEFAULTS = {
  ceoName: "Jeffrey Anderson",
  ceoImageUrl: "/ceo-jeffrey-anderson.jpg",
  phone: "(774) 564-8357",
  hqAddress: "42 Broadway",
  hqCity: "New York, NY 10004",
};

router.get("/settings", async (_req, res) => {
  try {
    const rows = await db.select().from(siteSettingsTable).where(eq(siteSettingsTable.id, 1));
    if (rows.length === 0) {
      res.json(DEFAULTS);
      return;
    }
    res.json(rows[0]);
  } catch {
    res.json(DEFAULTS);
  }
});

export default router;
