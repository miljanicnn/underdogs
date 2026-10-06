import Fastify from "fastify";
import type { HealthResponse } from "@underdogs/shared";
import { db } from "./db/index.js";
import { sql } from "drizzle-orm";

const app = Fastify({ logger: true });

app.get("/health", async (): Promise<HealthResponse> => {
  try {
    await db.execute(sql`select 1`);
    return { status: "ok", database: "ok" };
  } catch (err) {
    app.log.error(err, "database health check failed");
    return { status: "ok", database: "unreachable" };
  }
});

const port = Number(process.env.PORT ?? 3000);

try {
  await app.listen({ port, host: "0.0.0.0" });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
