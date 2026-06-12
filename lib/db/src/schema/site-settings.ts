import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const siteSettingsTable = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  ceoName: text("ceo_name").notNull().default("Jeffrey Anderson"),
  ceoImageUrl: text("ceo_image_url").notNull().default("/ceo-jeffrey-anderson.jpg"),
  phone: text("phone").notNull().default("(774) 564-8357"),
  hqAddress: text("hq_address").notNull().default("42 Broadway"),
  hqCity: text("hq_city").notNull().default("New York, NY 10004"),
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettingsTable).omit({ id: true });
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettingsTable.$inferSelect;
