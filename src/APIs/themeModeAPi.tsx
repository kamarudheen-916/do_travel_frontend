import axiosInstance from "../services/axios";

export const setThemModeAPI =async (mode:string)=> {
    try {        
        return await axiosInstance.put(`/user/setThemeMode`,{mode})
    } catch (error) {
        console.log('fetch follow data  API error :',error);
        throw error
    }
}

export const getThemModeAPI =async ()=> {
    try {        
        return await axiosInstance.get(`/user/getThemeMode`)
    } catch (error) {
        console.log('fetch follow data  API error :',error);
        throw error
    }
}