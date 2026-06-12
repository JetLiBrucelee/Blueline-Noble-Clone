import { db } from "./index";
import { siteSettingsTable } from "./schema/site-settings";
import { eq } from "drizzle-orm";

async function seed() {
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
    console.log("Seeded site_settings with default row.");
  } else {
    console.log("site_settings already has a row — skipping seed.");
  }
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
