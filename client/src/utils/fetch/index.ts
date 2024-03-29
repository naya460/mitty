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

import createPostRequest from "utils/fetch/create_post_request";

export default async function mittyFetch(options: {
  route: string,
  post_data?: Object,
}): Promise<Response> {
  // post_dataがあるとき、Requestデータを作成
  const post = (() => {
    if (options.post_data === undefined) return null;
    return createPostRequest(options.post_data);
  })();
  
  // APIにアクセス
  const res = await fetch(
    `http://${location.hostname}:9090/${options.route}`,
    { ...post,  mode: 'cors', credentials: 'include' }
  );

  return res;
}
