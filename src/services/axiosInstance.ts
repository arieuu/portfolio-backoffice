import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://api.arielcarvalho.io/api/v1",
});

export default axiosInstance;