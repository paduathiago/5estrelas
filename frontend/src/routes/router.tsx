import { createBrowserRouter } from "react-router-dom";
import MainPage from "./main-page/MainPage";
import UserProfile from "./user-profile/UserProfile";
import Login from "./login/Login";
import Register from "./register/Register";
import Establishments from "./establishments/Establishments";
import Establishment from "./establishment/Establishment";
import Layout from "./Layout";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
    },
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/establishments",
        element: <Establishments />,
    },
    {
        path: "/establishments/:id",
        element: <Establishment />,
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