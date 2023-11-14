import { FastifyInstance, FastifyPluginOptions } from "fastify";

import apiUserRoutes from "./user";

export default function apiRoutes(
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
): void {
  server.register(apiUserRoutes, { prefix: 'user' });

  done();
}
