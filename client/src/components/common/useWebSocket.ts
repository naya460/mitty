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
      const a = await fetch('api/use_ws');
      cookie = await a.text();
    })();
    socket = new WebSocket(`ws://${location.hostname}:8080/`);

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