import { db } from "../db/index.js";
import { fetchBootstrapStatic } from "../fpl/client.js";
import { importPlayers } from "../fpl/import-players.js";
import { importGameweeks } from "../fpl/import-gameweeks.js";

const {elements, events} = await fetchBootstrapStatic()
const playerCount = await importPlayers(elements)
console.log(`Imported ${playerCount} players.`)

const gameweekCount = await importGameweeks(events)
console.log(`Imported ${gameweekCount} gameweeks.`)



await db.$client.end();