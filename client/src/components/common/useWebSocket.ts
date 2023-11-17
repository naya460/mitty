import { useEffect } from 'react'

let socket: WebSocket = null;
let cookie: String = null;
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
      cookie = (await a.json()).session_id;
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
        socket.send(JSON.stringify({...message, cookie}));
      }
    }
  ];
}