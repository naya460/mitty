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

import { useEffect, useRef } from 'react';

let socket: WebSocket = null;
let ws_id: string = null;

export default function useWebSocket(
  callback? : (message) => void,
  route?: string,
): [(message) => void] {
  useEffect(() => {
    // WebSocketが生成されていないとき、作成
    if (socket != null) return;

    // ws_idを取得する
    (async () => {
      const a = await fetch(
        `http://${location.hostname}:9090/use_ws`,
        { mode: 'cors', credentials: 'include' }
      );
      ws_id = (await a.json()).ws_id;
    })();

    // websocketで接続する
    socket = new WebSocket(`ws://${location.hostname}:9090/`);

    // 接続時にデータをsubscribeする
    socket.onopen = (event) => {
      (async () => {
        while (!ws_id) {
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
        socket.send(JSON.stringify({ route: 'subscribe', ws_id }));
      })();
    }

    return () => {
      socket.close();
    }
  }, []);

  // コールバック関数の更新
  useEffect(() => {
    // ソケットが登録されていないとき、無視
    if (socket === null) return;

    // コールバックが無いとき無視
    if (callback === undefined) return;
    
    // イベントリスナーを作成
    const listener = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (route === undefined || route === data.route) {
        callback(data);
      }
    };
    socket.addEventListener('message', listener)

    return () => {
      socket.removeEventListener('message', listener);
    };
  }, [callback]);

  return [
    (message: Object): void => {
      if (socket.OPEN) {
        socket.send(JSON.stringify({ ...message, ws_id: ws_id }));
      }
    }
  ];
}
