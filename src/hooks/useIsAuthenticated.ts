import { useQuery } from "react-query";
import axiosInstance from "../services/axiosInstance";


const useIsAuthenticated = () => {

    const queryFn = () => axiosInstance.get("/session", {headers: {Authorization: `Bearer ${localStorage.getItem("loginToken")}`}})
    .then(res => res.data)

    const query = useQuery({
        queryKey: ["checkAuth"],
        queryFn: queryFn,
        retry: 0 // We don't retry so that an unauthorized user doesn't linger too long in a private page
    })
 
    return query;

}

export default useIsAuthenticated;