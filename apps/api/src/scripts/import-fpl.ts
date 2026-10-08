import { db } from "../db/index.js";
import { importFplData } from "../fpl/import-fpl-data.js";

const result = await importFplData();

console.log(
  `Imported ${result.gameweeks} gameweeks and ${result.players} players.`,
);

await db.$client.end();
