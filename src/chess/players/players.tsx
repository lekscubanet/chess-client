import { ChessPlayer, figureColor } from '../types';
import { useWebSocket } from '../../hooks/useWebsocket';
import Cookies from 'js-cookie';
import { useState } from 'react';
import './players.css';

type players = {
  white: ChessPlayer | null;
  black: ChessPlayer | null;
  isCheck: boolean;
  currentTurn: figureColor;
};

type joinButton = {
  name: string;
  side: figureColor;
};

const JoinButton: React.FC<joinButton> = ({ name, side }) => {
  const ws = useWebSocket();

  const [userName, setUserName] = useState<string>('');

  const handleClick = (side: figureColor) => {
    const url = new URL(window.location.href);

    ws?.emit(
      'MSG',
      JSON.stringify({
        type: 'PLAYERJOIN',
        payload: {
          lobbyID: url.pathname.replace('/game/', ''),
          playerID: Cookies.get('chess'),
          side: side,
          userName: userName,
        },
      }),
    );
  };

  return (
    <>
      <input
        type="text"
        onChange={(event) => setUserName(event.target.value)}
        value={userName}
        placeholder="Укажите Имя"
      />
      <button
        onClick={() => handleClick(side)}
        className="players_info_join_btn"
      >
        {name}
      </button>
    </>
  );
};

const Players: React.FC<players> = ({ white, black, isCheck, currentTurn }) => {
  let inGame = false;

  if (Cookies.get('chess') !== undefined) {
    if (
      Cookies.get('chess') === white?.id ||
      Cookies.get('chess') === black?.id
    ) {
      inGame = true;
    }
  }

  const PlayerWhite = () => {
    if (white || inGame) {
      return (
        <>
          <p>Имя: {white?.name}</p>
          <p> Количество ошибок: {white?.mistakesCount}</p>
          <p>{currentTurn === 'WHITE' && isCheck ? 'ШАХ' : ''}</p>
        </>
      );
    } else {
      return <JoinButton name={'Присоединиться'} side={'WHITE'} />;
    }
  };

  const PlayerBlack = () => {
    if (black || inGame) {
      return (
        <>
          <p>Имя: {black?.name}</p>
          <p> Количество ошибок: {black?.mistakesCount}</p>
          <p>{currentTurn === 'BLACK' && isCheck ? 'ШАХ' : ''}</p>
        </>
      );
    } else {
      return <JoinButton name={'Присоединиться'} side={'BLACK'} />;
    }
  };

  return (
    <>
      <div className="players_info">
        <p>Игроки:</p>
        <div>Белые: {<PlayerWhite />}</div>
        <div>Черные: {<PlayerBlack />}</div>
      </div>
    </>
  );
};

export default Players;
