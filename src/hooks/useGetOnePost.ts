import { useQuery } from "react-query";
import axiosInstance from "../services/axiosInstance";
import { IPost } from "../types/main";



const useGetOnePost = (postId: string = "") => {

    const query = useQuery({
        queryKey: ["getOnePost"],
        queryFn: () => {
            return axiosInstance.get<IPost>("post/" + postId)
            .then(res => res.data)
        }
    });

    return query;

}

export default useGetOnePost;