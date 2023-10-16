import { Flex, Spinner } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import useIsAuthenticated from "../hooks/useIsAuthenticated";


const PrivateRoutes = () => {
    const { error, isLoading } =  useIsAuthenticated();

    /**
     * Parent page to all protected children pages
     *
     * Everytime a private route is rendered we check if the
     * user has a valid token, if they don't they get redirected
     * to the login page.
     * 
     * The inner page will not be rendered until react query is done loading,
     * in the meantime we show a loading indicator
     */

    return (
        <>
            
            { isLoading && <Flex width="100%" height="100vh" justifyContent="center"> <Spinner justifySelf="center" alignSelf="center"/> </Flex> }

            {error && <Navigate to="/"/>}

            { !isLoading && !error && <Outlet />}
        </>
    )

}

export default PrivateRoutes;