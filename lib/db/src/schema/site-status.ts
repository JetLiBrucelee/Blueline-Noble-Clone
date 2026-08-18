import { pgTable, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const siteStatusTable = pgTable("site_status", {
  id: integer("id").primaryKey().default(1),
  paused: boolean("paused").notNull().default(false),
  pausedAt: timestamp("paused_at"),
});

export type SiteStatus = typeof siteStatusTable.$inferSelect;
