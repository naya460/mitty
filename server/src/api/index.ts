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

import apiUserRoutes from "./user";
import apiMessageRoutes from "./message";
import apiGroupRoutes from "./group";
import { useWsRoute } from "./use_ws";

export default function apiRoutes(
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
): void {
  server.register(apiUserRoutes, { prefix: 'user' });

  server.register(apiMessageRoutes, { prefix: 'message' });

  server.register(apiGroupRoutes, { prefix: 'group' });

  server.get('/use_ws', useWsRoute);

  done();
}
