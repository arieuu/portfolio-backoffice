import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://api.arielcarvalho.io:3000/api/v1",
});

export default axiosInstance;