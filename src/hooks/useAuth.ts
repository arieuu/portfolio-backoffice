import axios, { AxiosStatic } from "axios"
import { error } from "console";
import { useMutation } from "react-query"
import { redirect, useNavigate } from "react-router-dom";

interface Ilogin {
    username: string,
    password: string,
}

// Custom error object with status codes

interface IError extends Error {
    response?: { status: number }
}

const useAuth = () => {

    const navigate = useNavigate();

    // The generic typing: what we get, error object, what we send

    const mutation = useMutation<string, IError, Ilogin>({
        mutationFn: (login:Ilogin) => {
        return axios.post("http://localhost:3000/api/v1/session", login)
                    .then(res => res.data)
       },

       onError: (error: IError) => {
        if (error.response?.status == 400) error.message = "Please fill in the data properly";
        if (error.response?.status == 401) error.message = "Username/password incorrect!";
       },
       
       onSuccess: (token) => {
        
        // When successfuly logged in save the received token to local storage and redirect to dashboard

        localStorage.setItem("loginToken", token);
        navigate("/dashboard");
       }
    });

    return mutation;
}

export default useAuth;