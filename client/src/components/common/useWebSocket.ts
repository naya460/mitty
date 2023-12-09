import { useEffect, useRef } from 'react';

function useWebSocketConnection() {
  const socket = useRef<WebSocket>(null);
  const ws_id = useRef<string>(null);

  useEffect(() => {
    // WebSocketが用意されていないとき、作成
    if (socket.current != null) return;

    // ws_idを取得する
    (async () => {
      const a = await fetch(
        `http://${location.hostname}:9090/use_ws`,
        { mode: 'cors', credentials: 'include' }
      );
      ws_id.current = (await a.json()).ws_id;
    })();

    // websocketで接続する
    socket.current = new WebSocket(`ws://${location.hostname}:9090/`);

    // 接続時にデータをsubscribeする
    socket.current. onopen = (event) => {
      (async () => {
        while (!ws_id.current) {
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
        socket.current.send(JSON.stringify({route: 'subscribe', ws_id: ws_id.current}));
      })();
    }

    return () => {
      socket.current.close();
    }
  }, []);

  return { socket: socket.current, ws_id: ws_id.current };
};

export default function useWebSocket(
  callback? : (message) => void,
  route?: string,
): [(message) => void] {
  const {socket, ws_id} = useWebSocketConnection();

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
        socket.send(JSON.stringify({...message, ws_id}));
      }
    }
  ];
}
