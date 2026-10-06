import { db } from "../db/index.js";
import { fetchBootstrapStatic } from "../fpl/client.js";
import { importPlayers } from "../fpl/import-players.js";

const {elements} = await fetchBootstrapStatic()
const count = await importPlayers(elements)
console.log(`Imported ${count} players.`)

await db.$client.end();