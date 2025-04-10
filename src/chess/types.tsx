type figureType = 'KING' | 'QUEEN' | 'ROOK' | 'BISHOP' | 'KNIGHT' | 'PAWN'
export type figureColor = 'WHITE' | 'BLACK';
export type gameStatuses = 'LOBBY' | 'PLAYING' | 'CHECKMATE' | 'DRAW'

export interface ChessPiece {
    type: figureType;
    color: figureColor;
}

export interface ChessPos {
    figure?: ChessPiece;
    pos: string;
    possibleMoves: string[];
}



export interface ChessPlayer {
    id: string;
    name: string;
    mistakesCount: number;
}

export interface ChessMove {
    from: string;
    to: string;
    chessPiece: ChessPiece;
}

export interface ChessGameState {
    id: string;
    board: ChessBoard;
    players: {
        white: ChessPlayer | null;
        black: ChessPlayer | null;
    };
    currentTurn: figureColor;
    movesHistory: ChessMove[];
    lostFigures: ChessPiece[];
    status: gameStatuses;
    winner?: ChessPlayer | null;
    startTime: number;
    playingTime: number;
    isCheck: boolean;
    isCheckmate: boolean;
}

export type ChessBoard = (ChessPos)[][];