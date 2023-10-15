import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import { useState } from "react";
import MainPage from "./pages/MainPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <MainPage />
    }
]);

export default router;