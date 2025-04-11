import React, { useEffect, useState } from 'react';
import { listenToChessEvent } from '../events';
import { ChessGameState, ChessPos } from '../types';
import './chess.css';
import './board.css';
import { useWebSocket } from '../../hooks/useWebsocket';
import Players from '../players/players';
import Cookies from 'js-cookie';
import Timer from '../timer/timer';
import Moves from '../moves/moves';
import Eliminated from '../eliminated/eliminated';
import useSound from '../../hooks/useSound';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

interface Params {
  show: string;
}

const DivLetters: React.FC<Params> = ({ show }) => {
  return (
    <div className={`board_divletters ${show}`}>
      {letters.map((letter) => (
        <div key={letter} className="board_divletter_letter">
          {letter}
        </div>
      ))}
    </div>
  );
};

const DivNumbers: React.FC<Params> = ({ show }) => {
  return (
    <div className={`board_divnumbers ${show}`}>
      {numbers.map((number) => (
        <div key={number} className={`board_divnumbers_number`}>
          {number}
        </div>
      ))}
    </div>
  );
};

const Board = () => {
  const [gameState, setGameState] = useState<ChessGameState | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<ChessPos>();

  const playSound = useSound('/sounds/move.mp3');

  const ws = useWebSocket();

  useEffect(() => {
    const unsubscribeBoard = listenToChessEvent('board-updated', (newBoard) => {
      setGameState(newBoard as ChessGameState);
    });

    return () => {
      unsubscribeBoard();
    };
  }, []);

  useEffect(() => {
    let boardEl = document.querySelectorAll<HTMLElement>('.board-el');
    boardEl.forEach((el) => {
      el.classList.remove('board-el_possible-move');
      el.classList.remove('board-el_selected');
      if (
        selectedPiece &&
        el.dataset.pos &&
        selectedPiece.possibleMoves.includes(el.dataset.pos)
      ) {
        el.classList.add('board-el_possible-move');
      }
    });

    if (selectedPiece) {
      const selEl = document.querySelector<HTMLElement>(
        `[data-pos=${selectedPiece.pos}]`,
      );
      selEl?.classList.add('board-el_selected');
    }
  }, [selectedPiece]);

  const choosePiece = (el: ChessPos): void => {
    const playerID = Cookies.get('chess');

    if (playerID) {
      if (
        el.figure?.color === 'WHITE' &&
        playerID === gameState?.players?.white?.id
      ) {
        setSelectedPiece(el);
      } else if (
        el.figure?.color === 'BLACK' &&
        playerID === gameState?.players?.black?.id
      ) {
        setSelectedPiece(el);
      }
    }
  };

  const sendMove = (el: ChessPos) => {
    const playerID = Cookies.get('chess');

    if (
      playerID &&
      gameState?.players?.white?.id &&
      gameState?.players?.black?.id
    ) {
      if (
        (gameState?.currentTurn === 'WHITE' &&
          playerID === gameState?.players?.white?.id) ||
        (gameState?.currentTurn === 'BLACK' &&
          playerID === gameState?.players?.black?.id)
      ) {
        if (
          selectedPiece !== el &&
          selectedPiece?.possibleMoves.includes(el.pos)
        ) {
          playSound();

          ws?.emit(
            'MSG',
            JSON.stringify({
              type: 'MOVE',
              payload: { piece: selectedPiece, to: el },
            }),
          );

          setSelectedPiece(undefined);
        }
      }
    }
  };

  if (gameState != null) {
    return (
      <div className="main-div">
        <div className="main-div_left">
          <Players
            white={gameState.players.white}
            black={gameState.players.black}
            isCheck={gameState.isCheck}
            currentTurn={gameState.currentTurn}
          ></Players>
        </div>
        <div className="main-div_center">
          <Timer
            playingTime={gameState.playingTime}
            status={gameState.status}
          ></Timer>

          <DivLetters show="" />
          <div className="board">
            <DivNumbers show="left_numbers" />
            <div className="board_main">
              {gameState.board.map((row, rowIndex) =>
                row.map((el, elIndex) => (
                  <div
                    key={`${rowIndex}${elIndex}`}
                    className={`board-el ${(rowIndex + elIndex) % 2 === 0 ? 'white' : 'black'}`}
                    data-pos={el.pos}
                    onClick={() => {
                      if (selectedPiece != null) {
                        sendMove(el);
                      }
                    }}
                  >
                    {el?.figure != undefined ? (
                      <div
                        className={`chess-piece ${el.figure.color.toLowerCase()}-${el.figure.type.toLowerCase()}`}
                        onClick={() => choosePiece(el)}
                      ></div>
                    ) : (
                      ''
                    )}
                  </div>
                )),
              )}
            </div>
            <DivNumbers show="mobile" />
          </div>
          <DivLetters show="mobile" />
        </div>
        <div className="main-div_right">
          <Moves
            currentTurn={gameState.currentTurn}
            movesHistory={gameState.movesHistory}
          ></Moves>
          <Eliminated lostFigures={gameState.lostFigures}></Eliminated>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h2>Нет ответа от сервера</h2>
      </>
    );
  }
};

export default Board;
