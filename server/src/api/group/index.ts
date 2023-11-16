import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getGroupRoute } from "./get";
import { createGroupBodySchema, createGroupRoute } from "./create";
import apiGroupMemberRoutes from "./member";

export default function apiGroupRoutes(
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
): void {
  server.register(apiGroupMemberRoutes, { prefix: '/member' });

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
