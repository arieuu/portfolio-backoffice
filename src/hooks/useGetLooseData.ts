import { useQuery } from "react-query"
import axiosInstance from "../services/axiosInstance"

// Custom hook to get all loose data

interface ILooseData {
    dataId: string,
    type: string,
    title: string,
    content: string,
    extraContent?: string,
}

const useGetLooseData = () => {
    const query = useQuery({
        queryKey: ["looseDate"],

        queryFn: () => {
            return axiosInstance.get<ILooseData[]>("/data")
            .then(res => res.data)
        }
    });

    return query;
}

export default useGetLooseData;