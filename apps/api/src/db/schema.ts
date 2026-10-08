import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { FplLiveStats } from "../fpl/client.js";

export const positionEnum = pgEnum("position", ["GKP", "DEF", "MID", "FWD"]);

export const players = pgTable("players", {
  id: integer().primaryKey(),
  webName: text().notNull(),
  firstName: text().notNull(),
  secondName: text().notNull(),
  teamId: integer().notNull(),
  position: positionEnum().notNull(),
  selectedByPercent: numeric({
    precision: 4,
    scale: 1,
    mode: "number",
  }).notNull(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const gameweeks = pgTable("gameweeks", {
  id: integer().primaryKey(),
  name: text().notNull(),
  deadlineTime: timestamp({ withTimezone: true }).notNull(),
  finished: boolean().notNull(),
  dataChecked: boolean().notNull(),
  statsImportedAt: timestamp({ withTimezone: true }),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const playerGameweekStats = pgTable(
  "player_gameweek_stats",
  {
    playerId: integer()
      .notNull()
      .references(() => players.id),
    gameweekId: integer()
      .notNull()
      .references(() => gameweeks.id),
    totalPoints: integer().notNull(),
    minutes: integer().notNull(),
    stats: jsonb().$type<FplLiveStats>().notNull(),
    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.playerId, table.gameweekId] })],
);
