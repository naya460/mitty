import { FastifyInstance, FastifyPluginOptions } from "fastify";

import { signinRoute, signinBodySchema } from './signin';
import { signoutRoute } from './signout';
import { signupRoute, signupBodySchema } from './signup';

export default function apiUserRoutes(
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
): void {
  server.post(
    '/signin',
    { schema: { body: signinBodySchema } },
    signinRoute
  );

  server.get(
    '/signout',
    signoutRoute
  );

  server.post(
    '/signup',
    { schema: { body: signupBodySchema } },
    signupRoute
  );

  done();
}
