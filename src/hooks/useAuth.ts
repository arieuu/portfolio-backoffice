import axios from "axios"
import { useMutation } from "react-query"

interface Ilogin {
    "username": string;
    "password": string
}

const useAuth = () => {

    const mutation = useMutation({
        mutationFn: (login:Ilogin) => {
        return axios.post("http://localhost:3000/api/v1/session", login)
                    .then(res => res.data)
       }
    });

    return mutation;
}

export default useAuth;