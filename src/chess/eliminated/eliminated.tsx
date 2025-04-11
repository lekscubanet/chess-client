import { ChessPiece } from '../types';
import { useMemo } from 'react';
import './eliminated.css';

interface EliminatedProps {
  lostFigures: ChessPiece[];
}

const Eliminated: React.FC<EliminatedProps> = ({ lostFigures }) => {
  const reversedArray = useMemo(
    () => [...lostFigures].reverse(),
    [lostFigures],
  );

  return (
    <>
      <div className="eliminated-figures">
        <h2>Выбывшие фигуры:</h2>
        <div className="eliminated-figures_log">
          {reversedArray.map((figure, index) => (
            <div key={index} className="eliminated-figures_log_row">
              <div className="eliminated-figures_log_row_index">
                {reversedArray.length - index}
              </div>
              <div className="eliminated-figures_log_row_figure">
                {figure.color} {figure.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Eliminated;
