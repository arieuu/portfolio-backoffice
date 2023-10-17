import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { IError, ILooseData } from "../types/main";


const useCreateLooseData = (onSucess: () => void) => {

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ["looseData"],

        mutationFn: (looseData: ILooseData) => {
            return axiosInstance.post<ILooseData>("/data",looseData, {headers: {Authorization: `Bearer ${localStorage.getItem("loginToken")}`}})
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

export default useCreateLooseData;