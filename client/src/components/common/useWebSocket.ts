import { useEffect } from 'react'

let socket: WebSocket = null;
let ws_id: String = null;
let callbacks = [];

export default function useWebSocket(callback? : (message) => void): [(message) => void] {
  useEffect(() => {
    // コールバック関数を追加
    if (callback) {
      callbacks.push(callback);
    }

    // WebSocketが用意されていないとき、作成
    if (socket != null) return;
    (async () => {
      const a = await fetch(
        `http://${location.hostname}:9090/use_ws`,
        { mode: 'cors', credentials: 'include' }
      );
      ws_id = (await a.json()).ws_id;
    })();
    socket = new WebSocket(`ws://${location.hostname}:9090/`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callbacks.forEach(f => {
        f(data);
      })
    }
  }, []);

  return [
    (message: Object): void => {
      if (socket.OPEN) {
        socket.send(JSON.stringify({...message, ws_id}));
      }
    }
  ];
}