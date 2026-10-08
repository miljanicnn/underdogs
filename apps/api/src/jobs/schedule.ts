import type { FastifyBaseLogger } from "fastify";
import cron from "node-cron";
import { importFplData } from "../fpl/import-fpl-data.js";
import { importFinishedGameweekStats } from "../fpl/import-gameweek-stats.js";

const FPL_IMPORT_SCHEDULE = "10 * * * *";

export function startScheduledJobs(log: FastifyBaseLogger): void {
  cron.schedule(
    FPL_IMPORT_SCHEDULE,
    async () => {
      try {
        const result = await importFplData();
        log.info(result, "FPL import finished");

        const statsGameweek = await importFinishedGameweekStats();
        if (statsGameweek.length > 0) {
          log.info({ gameweeks: statsGameweek }, "Gameweek stats imported");
        }
      } catch (err) {
        log.error(err, "FPL import failed");
      }
    },
    { name: "fpl-import", noOverlap: true },
  );

  log.info(`FPL import scheduled: "${FPL_IMPORT_SCHEDULE}"`);
}
