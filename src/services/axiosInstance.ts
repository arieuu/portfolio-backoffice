import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://backend.arielcarvalho.io:3000/api/v1",
});

export default axiosInstance;