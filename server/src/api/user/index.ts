// Copyright 2023 naya460
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { FastifyInstance, FastifyPluginOptions } from "fastify";

import { signinRoute, signinBodySchema } from './signin';
import { signoutRoute } from './signout';
import { signupRoute, signupBodySchema } from './signup';
import { getUserNameRoute, getUserNameSchema } from "./get_name";
import { renameBodySchema, renameRoute } from "./rename";
import { getIconRoute, getIconSchema } from "./icon/get";
import { setIconRoute, setIconSchema } from "./icon/set";
import { checkAuthRoute } from "./check_auth";

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
  
  server.post(
    '/get_name',
    { schema: { body: getUserNameSchema } },
    getUserNameRoute
  );

  server.post(
    '/rename',
    { schema: { body: renameBodySchema } },
    renameRoute
  );

  server.post(
    '/get_icon',
    { schema: { body: getIconSchema } },
    getIconRoute
  );

  server.post(
    '/set_icon',
    { schema: { body: setIconSchema } },
    setIconRoute
  );

  server.get(
    '/check_auth',
    checkAuthRoute
  );

  done();
}
