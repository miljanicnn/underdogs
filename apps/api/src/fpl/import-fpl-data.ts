import { fetchBootstrapStatic } from "./client.js";
import { importGameweeks } from "./import-gameweeks.js";
import { importPlayers } from "./import-players.js";

export type FplImportResult = {
  gameweeks: number;
  players: number;
};

export async function importFplData(): Promise<FplImportResult> {
  const { elements, events } = await fetchBootstrapStatic();

  const players = await importPlayers(elements);
  const gameweeks = await importGameweeks(events);

  return { gameweeks, players };
}
