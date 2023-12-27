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

import { mittyCacheManager } from "./manager";

const cacheManagerList = new Map<string, mittyCacheManager<any, any>>;

export const addCacheManager = function <IdT, DataT>(
  cache_id: string, manager: mittyCacheManager<IdT, DataT>
): boolean {
  if (cacheManagerList.has(cache_id)) return false;
  cacheManagerList.set(cache_id, manager);
};

export const getCacheManager = function (cache_id: string) {
  return cacheManagerList.get(cache_id);
}
