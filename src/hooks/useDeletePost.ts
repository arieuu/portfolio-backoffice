import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../services/axiosInstance";
import { IError } from "../types/main";
import { useNavigate } from "react-router-dom";


const useDeletePost = (onSuccess: () => void) => {
    const navigate = useNavigate();
    
    // We get query client so we can refetch data

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ["deletePost"],
        mutationFn: (postId: string) => {
            return axiosInstance.delete("/post/" + postId, {headers: {Authorization: `Bearer ${localStorage.getItem("loginToken")}`}})

            // Invalidate the cache with the posts so that an immediate refetch can happen after successful deletion

            .then(res => queryClient.invalidateQueries(["posts"]))
        },

        onError: (error: IError) => {
            if (error.response?.status == 401) {
                error.message = "Username/password incorrect!";
                navigate("/");
                localStorage.setItem("loginToken", "");
            }
        },

        onSuccess: onSuccess
    });

    return mutation;

}

export default useDeletePost;