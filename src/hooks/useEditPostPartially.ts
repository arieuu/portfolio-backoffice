import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../services/axiosInstance";
import { IError, IPost } from "../types/main";
import { useNavigate } from "react-router-dom";

const useEditPostPartially = (onSuccess: () => void) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ["editPost"],

        mutationFn: (post: {}) => {
            return axiosInstance.put<IPost>("post/alter", post, {headers: {Authorization: `Bearer ${localStorage.getItem("loginToken")}`}})
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
    })

    return mutation;

}

export default useEditPostPartially;