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

export default function createPostRequest(data: Object) {
  // JSONとしてテキスト化
  const json_str = JSON.stringify(data);

  // 送信するリクエスト内容を作成
  return {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: json_str
  }
}
