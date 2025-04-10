import { EventEmitter } from 'events';

export const chessEvents = new EventEmitter();


type ChessEvent = 'board-updated' | 'move-made' | 'connection-changed';


export const emitChessEvent = (event: ChessEvent, data: unknown) => {
    chessEvents.emit(event, data);
};

export const listenToChessEvent = (
    event: ChessEvent,
    callback: (data: unknown) => void
) => {
    chessEvents.on(event, callback);
    return () => chessEvents.off(event, callback);
};