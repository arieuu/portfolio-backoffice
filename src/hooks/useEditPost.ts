import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { IError, IPost } from "../types/main";

const useEditPost = (onSucess: () => void) => {

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ["createPost"],

        mutationFn: (postData: IPost) => {
            return axiosInstance.put<IPost>("/post", postData, {headers: {
                Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                "Content-Type": "multipart/form-data"
            }})
            .then(res => res.data)
        },

        onSuccess: onSucess,

        onError: (error: IError) => {
            if (error.response?.status == 401) {
                error.message = "Username/password incorrect!";
                navigate("/");
                localStorage.setItem("loginToken", "");
            }
        }
    });

    return mutation;

}

export default useEditPost;