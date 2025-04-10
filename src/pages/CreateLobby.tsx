import React from 'react';
import {useNavigate} from "react-router-dom";

interface CreateLobby {
    success: boolean;
    lobbyID: string;
}

function CreateLobby() {

    const navigate = useNavigate();

    const handleClick = async () => {

        try {

            const res = await fetch("http://localhost:3000/api/createlobby", {method: "GET"});

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data: CreateLobby = await res.json();

            if (data.success && data.lobbyID) {
                navigate(`/game/${data.lobbyID}`);
            }


        } catch (error) {

        }


    };

    return (
        <button onClick={handleClick} className="create_lobby_btn">Создать лобби</button>
    );
}

export default CreateLobby;