import { useQuery } from "react-query";
import axiosInstance from "../services/axiosInstance";
import { IPost } from "../types/main";


const useGetPosts = () => {

    const query = useQuery({
        queryKey: ["Posts"],
        queryFn: () => {
            return axiosInstance.get<IPost[]>("/post")
            .then(res => res.data)
        }
    });

    return query;

}

export default useGetPosts;