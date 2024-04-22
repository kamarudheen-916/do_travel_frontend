import axiosInstance from "../services/axios";

export const submitCommentAPI = async (comment:string,postId:string)=>{
    try {
        return await axiosInstance.post('/user/postComment',{comment,postId})
    } catch (error) {
        console.log('submitCommentAPi error :',error);
        
    }
}

