import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Game from "../pages/Game";
import Unknown from "../pages/Unknown";
import {WebSocketProvider} from "../hooks/useWebsocket";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/game/*" element={<WebSocketProvider><Game/></WebSocketProvider>}/>
                <Route path="*" element={<Unknown/>}/> {/* 404 */}
            </Routes>
        </BrowserRouter>
    )

}

export default Router;