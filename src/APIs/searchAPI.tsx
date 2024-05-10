import axiosInstance from "../services/axios";

export const userSearchAPI = async (searchData:string)=>{
    try {
        
        return await axiosInstance.get(`/user/userSearch?searchData=${searchData}`)
    } catch (error) {
        console.log('userSearchAPI error :',error);
        
    }
}