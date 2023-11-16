import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getGroupMemberBodySchema, getGroupMemberRoute } from "./get";
import { addGroupMemberBodySchema, addGroupMemberRoute } from "./add";

export default function apiGroupMemberRoutes(
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
): void {
  server.post(
    '/get',
    { schema: { body: getGroupMemberBodySchema } },
    getGroupMemberRoute
  );

  server.post(
    '/add',
    { schema: { body: addGroupMemberBodySchema } },
    addGroupMemberRoute
  );

  done();
}
