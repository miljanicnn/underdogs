import { db } from "../db/index.js";
import { importFplData } from "../fpl/import-fpl-data.js";
import { importFinishedGameweekStats } from "../fpl/import-gameweek-stats.js";

const result = await importFplData();

console.log(
  `Imported ${result.gameweeks} gameweeks and ${result.players} players.`,
);

const statsGameweek = await importFinishedGameweekStats();

console.log(
  statsGameweek.length > 0
    ? `Imported stats for gameweeks: ${statsGameweek.join(", ")}.`
    : "No finished gameweeks",
);
await db.$client.end();
