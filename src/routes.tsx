import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoutes from "./pages/PrivateRoutes";
import DashboardHome from "./components/DashboardHome";
import CreateData from "./components/CreateData";
import ListData from "./components/ListData";
import ListPosts from "./components/ListPosts";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },

    {
        element: <PrivateRoutes />,
        children: [
            {
                path: "/dashboard/",
                element: <Dashboard/>,
                children: [
                    {
                        path: "",
                        element: <DashboardHome />
                    },
                    {
                        path: "data",
                        element: <ListData />
                    },
                    {
                        path: "data/create/:dataTypeParam?",
                        element: <CreateData />
                    },
                    {
                        path: "posts",
                        element: <ListPosts />
                    }
                ]
            }
        ]
    }
]);

export default router;