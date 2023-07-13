import { useState, useEffect, useRef } from 'react'

let callbacks = [];

export default function useWebSocket(callback? : (message) => void): [(message) => void, String] {
    const socket = useRef<WebSocket>(null);
    const [cookie, setCookie] = useState<String>(null);

    useEffect(() => {
      if (callback) {
        callbacks.push(callback);
      }

      (async () => {
        const a = await fetch('api/use_ws');
        setCookie(await a.text());
        socket.current = new WebSocket(`ws://${location.hostname}:8080/`);
  
        socket.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          callbacks.forEach(f => {
            f(data);
          })
        }
      })();
    }, []);
  
    return [
      (message: Object): void => {
        if (socket.current.OPEN) {
          socket.current.send(JSON.stringify(message));
        }
      }, cookie
    ];
  }