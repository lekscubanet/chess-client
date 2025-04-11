import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../hooks/useWebsocket';
import Board from '../chess/board/board';

const Game = () => {
  const ws = useWebSocket();
  const [socketStatus, setSocketStatus] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (!ws) return;

    setSocketStatus(ws?.connected);

    if (ws?.connected) {
      const url = new URL(window.location.href);

      ws.emit(
        'MSG',
        JSON.stringify({
          type: 'GETBOARD',
          payload: { lobbyID: url.pathname.replace('/game/', '') },
        }),
      );
    }
  }, [ws?.connected]);

  return (
    <>
      <h2 className={socketStatus ? 'socketgood' : 'socketbad'}>
        Игра {socketStatus ? 'идет' : 'на паузе'}
      </h2>

      <Board></Board>
    </>
  );
}

export default Game;
