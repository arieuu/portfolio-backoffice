import axios from "axios"
import { error } from "console";
import { useMutation } from "react-query"

interface Ilogin {
    username: string,
    password: string,
}

interface Iresponse {
    token: string,
}

// Custom error object with status codes

interface IError extends Error {
    response?: { status: number }
}

const useAuth = () => {

    // The generic typing: what we get, error object, what we send

    const mutation = useMutation<Iresponse, IError, Ilogin>({
        mutationFn: (login:Ilogin) => {
        return axios.post("http://localhost:3000/api/v1/session", login)
                    .then(res => res.data)
       },

       onError: (error) => {
        if (error.response?.status == 400) error.message = "Please fill in the data properly";
        if (error.response?.status == 401) error.message = "Username/password incorrect!";
       }
    });

    return mutation;
}

export default useAuth;