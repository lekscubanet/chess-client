import { ChessMove, figureColor } from '../types';
import { useMemo } from 'react';
import './moves.css';

interface MovesProps {
  currentTurn: figureColor;
  movesHistory: ChessMove[];
}

const Moves: React.FC<MovesProps> = ({ currentTurn, movesHistory }) => {
  const reversedArray = useMemo(
    () => [...movesHistory].reverse(),
    [movesHistory],
  );

  return (
    <>
      <div className="moves-history">
        <h2>Сейчас ходят: {currentTurn}</h2>
        <h2>История ходов:</h2>
        <div className="moves-history_log">
          {reversedArray.map((move, index) => (
            <div key={index} className="moves-history_log_row">
              <div className="moves-history_log_row_index">
                {reversedArray.length - index}
              </div>
              <div className="moves-history_log_row_figure">
                {move.chessPiece.color} {move.chessPiece.type}
              </div>
              <div className="moves-history_log_row_move">
                {move.from} - {move.to}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Moves;
