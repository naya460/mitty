import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getGroupRoute } from "./get";
import { createGroupBodySchema, createGroupRoute } from "./create";

export default function apiGroupRoutes(
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
): void {
  server.get(
    '/get',
    getGroupRoute
  );

  server.post(
    '/create',
    { schema: { body: createGroupBodySchema } },
    createGroupRoute
  );

  done();
}
