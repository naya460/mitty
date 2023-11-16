import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getGroupRoute } from "./get";

export default function apiGroupRoutes(
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
): void {
  server.get(
    '/get',
    getGroupRoute
  );

  done();
}
