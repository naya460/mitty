import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getGroupMemberBodySchema, getGroupMemberRoute } from "./get";

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

  done();
}
