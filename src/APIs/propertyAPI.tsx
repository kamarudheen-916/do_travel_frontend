import { Room } from "../Interfaces/interfaces";
import axiosInstance from "../services/axios";

export const addRoomAPI =async(roomData:Room)=>{
    try {
        console.log('test--------------',roomData);
        
        return await axiosInstance.post('/user/addRoom',roomData)
    } catch (error) {
        console.log('addRoomAPI error : ',error);
        throw error
    }
}

export const fetchRoomDataAPI = async()=>{
    try {
        return await axiosInstance.get('/user/fetchRoomData')
    } catch (error) {
        console.log('fetch room data api error :',error);
        throw new Error('Oops..! Fetch room data api error..!')
    }
}
export const fetchOthersProfileRoomDataAPI = async(Id:string|undefined)=>{
    try {
        console.log('fetchOthersProfileRoomDataAPI test in fornt end');
        
        return await axiosInstance.get(`/user/fetchOtherProfileRoomData?profileId=${Id}`)
    } catch (error) {
        console.log('fetch room data api error :',error);
        throw new Error('Oops..! fetchOthersProfileRoomDataAPI data api error..!')
    }
}
export const submitCommentAPI = async (comment:string,postId:string)=>{
    try {
        return await axiosInstance.post('/user/postComment',{comment,postId})
    } catch (error) {
        console.log('submitCommentAPi error :',error);
        
    }
}
