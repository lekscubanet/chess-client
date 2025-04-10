import {emitChessEvent} from "./events";
import Cookies from "js-cookie";


export const socketRouter = (data: string) => {

    const json = JSON.parse(data);

    switch (json.type) {

        case "GETBOARD":

            if (json.status === 'SUCCESS') {

                emitChessEvent('board-updated', json.payload);

            }
            break;

        case "PLAYERJOIN":

            if (json.status === 'SUCCESS') {

                if (!Cookies.get('chess')) {
                    Cookies.set('chess', json.playerID);
                }

                emitChessEvent('board-updated', json.payload);

            }
            break;

        case "MOVE":

            if (json.status === 'SUCCESS') {
                emitChessEvent('board-updated', json.payload);
            }
            break;

    }

}