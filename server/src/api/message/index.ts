import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getMessageBodySchema, getMessageRoute } from "./get";
import { sendMessageBodySchema, sendMessageRoute } from "./send";

export default function apiMessageRoutes(
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
): void {
  server.post(
    '/get',
    { schema: { body: getMessageBodySchema } },
    getMessageRoute
  );

  server.post(
    'send',
    { schema: { body: sendMessageBodySchema } },
    sendMessageRoute
  );

  done();
}
