import { integer, numeric, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const positionEnum = pgEnum("position", ["GKP", "DEF", "MID", "FWD"]);

export const players = pgTable("players", {
    id: integer().primaryKey(),
    webName: text().notNull(),
    firstName: text().notNull(),
    secondName: text().notNull(),
    teamId: integer().notNull(),
    position: positionEnum().notNull(),
    selectedByPercent: numeric({ precision: 4, scale: 1, mode: "number"}).notNull(),
    updatedAt: timestamp({withTimezone: true}).notNull().defaultNow(),
})