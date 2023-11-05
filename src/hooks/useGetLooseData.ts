import { useQuery } from "react-query"
import axiosInstance from "../services/axiosInstance"
import { ILooseData } from "../types/main";

// Custom hook to get all loose data

const useGetLooseData = () => {

    const query = useQuery({
        queryKey: ["looseData"],

        queryFn: () => {
            return axiosInstance.get<ILooseData[]>("/data")
            .then(res => res.data)
        },

        staleTime: 10 * (60 * 1000)
    });

    return query;
}

export default useGetLooseData;