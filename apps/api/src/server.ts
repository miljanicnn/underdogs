import Fastify from "fastify";
import type { HealthResponse } from "@underdogs/shared";

const app = Fastify({ logger: true });

app.get("/health", async (): Promise<HealthResponse> => {
  return { status: "ok" };
});

const port = Number(process.env.PORT ?? 3000);

try {
  await app.listen({ port, host: "0.0.0.0" });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
