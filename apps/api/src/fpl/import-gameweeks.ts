import { sql } from "drizzle-orm";
import { gameweeks } from "../db/schema.js";
import type { FplEvent } from "./client.js";
import { db } from "../db/index.js";

type NewGameweek = typeof gameweeks.$inferInsert

export function toGameweekRow(event: FplEvent): NewGameweek {
    return {
        id: event.id,
        name: event.name,
        deadlineTime: new Date(event.deadline_time),
        finished: event.finished,
        dataChecked: event.data_checked
    }
}

export async function importGameweeks(events: FplEvent[]): Promise<number> {
    const rows = events.map(toGameweekRow)

    await db.insert(gameweeks).values(rows).onConflictDoUpdate({
        target: gameweeks.id,
        set: {
            name: sql`excluded.name`,
            deadlineTime: sql`excluded.deadline_time`,
            finished: sql`excluded.finished`,
            dataChecked: sql`excluded.data_checked`,
            updatedAt: sql`now()`,
        }
    })
    return rows.length
}