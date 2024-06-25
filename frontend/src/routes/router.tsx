import { createBrowserRouter } from "react-router-dom";
import MainPage from "./main-page/MainPage";
import UserProfile from "./user-profile/UserProfile";
import Login from "./login/Login";
import Register from "./register/Register";
import Stablishments from "./stablishments/Stablishments";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },

    {
        path: "/stablishments",
        element: <Stablishments />,
    },

    {
        path: "/user/:id",
        element: <UserProfile />,
    },

    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/register",
        element: <Register />,
    },

    {
        path: "*",
        element: <div>404 not found</div>,
    },
]);