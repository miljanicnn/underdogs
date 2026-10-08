import { and, eq, isNull, sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { gameweeks, playerGameweekStats } from "../db/schema.js";
import { fetchEventLive, type FplLiveElement } from "./client.js";

type NewPlayerGameweekStats = typeof playerGameweekStats.$inferInsert;

export function toStatsRow(
  gameweekId: number,
  element: FplLiveElement,
): NewPlayerGameweekStats {
  return {
    playerId: element.id,
    gameweekId,
    totalPoints: element.stats.total_points,
    minutes: element.stats.minutes,
    stats: element.stats,
  };
}

export async function importGameweekStats(gameweekId: number): Promise<number> {
  const { elements } = await fetchEventLive(gameweekId);
  const rows = elements.map((element) => toStatsRow(gameweekId, element));

  await db.transaction(async (tx) => {
    await tx
      .insert(playerGameweekStats)
      .values(rows)
      .onConflictDoUpdate({
        target: [playerGameweekStats.playerId, playerGameweekStats.gameweekId],
        set: {
          totalPoints: sql`excluded.total_points`,
          minutes: sql`excluded.minutes`,
          stats: sql`excluded.stats`,
          updatedAt: sql`now()`,
        },
      });

    await tx
      .update(gameweeks)
      .set({ statsImportedAt: new Date() })
      .where(eq(gameweeks.id, gameweekId));
  });

  return rows.length;
}

export async function importFinishedGameweekStats(): Promise<number[]> {
  const pending = await db
    .select({ id: gameweeks.id })
    .from(gameweeks)
    .where(
      and(
        eq(gameweeks.finished, true),
        eq(gameweeks.dataChecked, true),
        isNull(gameweeks.statsImportedAt),
      ),
    )
    .orderBy(gameweeks.id);

  for (const gameweek of pending) {
    await importGameweekStats(gameweek.id);
  }

  return pending.map((gameweek) => gameweek.id);
}
