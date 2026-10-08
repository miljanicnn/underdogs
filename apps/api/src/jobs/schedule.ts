import type { FastifyBaseLogger } from "fastify";
import cron from "node-cron";
import { importFplData } from "../fpl/import-fpl-data.js";

const FPL_IMPORT_SCHEDULE = "10 * * * *";

export function startScheduledJobs(log: FastifyBaseLogger): void {
  cron.schedule(
    FPL_IMPORT_SCHEDULE,
    async () => {
      try {
        const result = await importFplData();
        log.info(result, "FPL import finished");
      } catch (err) {
        log.error(err, "FPL import failed");
      }
    },
    { name: "fpl-import", noOverlap: true },
  );

  log.info(`FPL import scheduled: "${FPL_IMPORT_SCHEDULE}"`);
}
