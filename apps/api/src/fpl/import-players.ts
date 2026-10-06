import { players } from "../db/schema.js";
import type { FplElement } from "./client.js";
import { db } from "../db/index.js";
import { sql } from "drizzle-orm";

type NewPlayer = typeof players.$inferInsert;

const POSITIONS = {
  1: "GKP",
  2: "DEF",
  3: "MID",
  4: "FWD",
} as const;

function isKnownElementType(type: number): type is keyof typeof POSITIONS {
  return type in POSITIONS;
}

export function toPlayerRow(element: FplElement): NewPlayer | null {
  if (!isKnownElementType(element.element_type)) {
    return null;
  }

  return {
    id: element.id,
    webName: element.web_name,
    firstName: element.first_name,
    secondName: element.second_name,
    teamId: element.team,
    position: POSITIONS[element.element_type],
    selectedByPercent: Number(element.selected_by_percent),
  };
}

export async function importPlayers(elements: FplElement[]): Promise<number> {
  const rows = elements.map(toPlayerRow).filter((row) => row !== null);

  await db
    .insert(players)
    .values(rows)
    .onConflictDoUpdate({
      target: players.id,
      set: {
        webName: sql`excluded.web_name`,
        firstName: sql`excluded.first_name`,
        secondName: sql`excluded.second_name`,
        teamId: sql`excluded.team_id`,
        position: sql`excluded.position`,
        selectedByPercent: sql`excluded.selected_by_percent`,
        updatedAt: sql`now()`,
      },
    });

  return rows.length;
}
