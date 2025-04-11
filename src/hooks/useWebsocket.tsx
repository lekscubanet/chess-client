import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { socketRouter } from '../chess/socket_router';

const WebSocketContext = createContext<SocketIOClient.Socket | undefined>(
  undefined,
);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Socket, setSocket] = useState<SocketIOClient.Socket>();

  type sendType = 'GETBOARD' | 'PLAYERJOIN' | 'MOVE' | 'SELECTPIECE' | 'CHAT';

  useEffect(() => {
    const ws = io('http://localhost:5555', {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 10000,
      query: {
        gameid: new URL(window.location.href).pathname.replace('/game/', ''),
      },
    });

    ws.on('connect', () => {
      console.log('Connected!');
      setSocket(ws);
    });

    ws.on('connect_error', (err: any) => {
      console.log('Connection error:', err);
    });

    ws.on('disconnect', () => {
      setSocket(undefined);
    });

    ws.on('MSGs', (arg: string) => {
      socketRouter(arg);
    });

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={Socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
