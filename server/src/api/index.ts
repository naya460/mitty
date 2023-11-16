import { FastifyInstance, FastifyPluginOptions } from "fastify";

import apiUserRoutes from "./user";
import apiMessageRoutes from "./message";
import apiGroupRoutes from "./group";

export default function apiRoutes(
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
): void {
  server.register(apiUserRoutes, { prefix: 'user' });

  server.register(apiMessageRoutes, { prefix: 'message' });

  server.register(apiGroupRoutes, { prefix: 'group' });

  done();
}
