import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Chat from "../Pages/Chat/Chat";

const router = createBrowserRouter([
    {path: '/', element: <Home/>},
    {path: '/chat-room', element: <Chat/>}
])

export default router;