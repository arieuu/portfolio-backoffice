import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoutes from "./pages/PrivateRoutes";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },

    {
        element: <PrivateRoutes />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard/>
            }
        ]
    }
]);

export default router;