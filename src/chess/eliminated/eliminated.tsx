import {ChessPiece} from "../types";
import {useMemo} from "react";
import './eliminated.css';

interface EliminatedProps {
    lostFigures: ChessPiece[];
}

const Eliminated: React.FC<EliminatedProps> = ({lostFigures}) => {

    const reversedArray =  useMemo(() => [...lostFigures].reverse(), [lostFigures]);

    return (
        <>

            <div className='eliminated-figures'>
                <h2>Выбывшие фигуры:</h2>
                <div className='eliminated-figures__log'>
                    {
                        reversedArray.map((figure, index) => (
                            <div key={index} className='eliminated-figures__log__row'>
                                <div className='eliminated-figures__log__row__index'>{reversedArray.length - index}</div>
                                <div className='eliminated-figures__log__row__figure'>{figure.color} {figure.type}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )

}

export default Eliminated;