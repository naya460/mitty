import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import createUser from './user/create';
import getUserHash from './user/get_hash';
import getUserId from './user/get_user_id';
import setUserCookie from './user/set_cookie';
import hasMember from './group/has_member';
import getGroup from './group/get';
import createGroup from './group/create';

export default function databaseRoutes(
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
): void {
  server.post<{ Body: { user_name: string, hash: string }}>(
    '/user/create',
    async (req, res) => {
      await createUser(req.body.user_name, req.body.hash);
    }
  );
  
  server.post<{ Body: { user_name: string } }>(
    '/user/get_hash',
    async (req, res) => {
      const hash = await getUserHash(req.body.user_name);
      res.type('application/json');
      return { hash };
    }
  );
  
  server.post<{ Body: { user_name: string } }>(
    '/user/get_user_id',
    async (req, res) => {
      const user_id = await getUserId(req.body.user_name);
      res.type('application/json');
      return { user_id };
    }
  );
  
  server.post<{ Body: { user_name: string, cookie: string } }>(
    '/user/set_cookie',
    async (req, res) => {
      await setUserCookie(req.body.user_name, req.body.cookie);
    }
  );

  server.post<{ Body: { user_name: string, group_id: string } }>(
    '/group/has_member',
    async (req, res) => {
      const exists = await hasMember(req.body.user_name, req.body.group_id);
      res.type('application/json');
      return { exists };
    }
  );

  server.post<{ Body: { user_name: string } }>(
    '/group/get',
    async (req, res) => {
      const groups = await getGroup(req.body.user_name);
      res.type('application/json');
      return { groups };
    }
  );

  server.post<{ Body: { user_name: string, group_name: string} }>(
    '/group/create',
    async (req, res) => {
      const ok = await createGroup(req.body.user_name, req.body.group_name);
      if (ok) res.status(201); else res.status(400);
    }
  )

  done();
}
