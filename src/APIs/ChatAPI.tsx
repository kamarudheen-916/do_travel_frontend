
import axiosInstance from "../services/axios";

export const getUsersForSidebarAPI = async ()=>{
    try {
        return await axiosInstance.get('/user/getUsersSideBar')
    } catch (error) {
        console.log('confirm booking api error :',error);
        
    }
}

export const getMessageAPI = async (id:any)=>{
    try {
        return await axiosInstance.get(`/user/getMessage/${id}`)
    } catch (error) {
        console.log('confirm booking api error :',error);
        
    }
}

export const sendMessageAPI = async (id:any,message:any)=>{
    try {
        return await axiosInstance.post(`/user/sendMessage/${id}`,{message})
    } catch (error) {
        console.log('confirm booking api error :',error);
        
    }
}