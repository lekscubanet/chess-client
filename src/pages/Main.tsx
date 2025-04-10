import React from 'react';
import CreateLobby from "./CreateLobby";

function Main() {
    return(
        <>
            <h1>Шахматы</h1>
            <div className='game-desc'>
                <p>Создайте лобби для игры.</p>
                <p>Поделитесь уникальной ссылкой с другом и зрителями.</p>
                <p>Двое игроков занимают свои места и игра начинается.</p>
            </div>
            <CreateLobby></CreateLobby>
        </>
    )
}

export default Main