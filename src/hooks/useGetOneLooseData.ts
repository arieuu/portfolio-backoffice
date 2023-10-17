import { useQuery } from "react-query";
import axiosInstance from "../services/axiosInstance";
import { ILooseData } from "../types/main";

// Hook to get a single loose data

const useGetOneLooseData = (type: string = "") => {

    /* We receive the type by a function parameter and pass it to the request url
        That type comes from the browser url and passed here */
   
    const query = useQuery({
        queryKey: ["singleLooseData"],

        queryFn: () => {
            return axiosInstance.get<ILooseData>("/data/" + type)
            .then(res => res.data)
        },

        refetchOnWindowFocus: false 
    });

    
    return query;
}

export default useGetOneLooseData;