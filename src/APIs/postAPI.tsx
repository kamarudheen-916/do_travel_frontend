import axiosInstance from "../services/axios";

export const submitCommentAPI = async (comment:string,postId:string|undefined)=>{
    try {
       
        return await axiosInstance.post('/user/postComment',{comment,postId})
    } catch (error) {
        console.log('submitCommentAPi error :',error);
        
    }
}

export const deleteCommentAPI = async (postId:string|undefined,commentId:string|undefined,index:number)=>{
    try {
        return await axiosInstance.delete('/user/deleteComment',{data:{postId,commentId,index}})
    } catch (error) {
        console.log('Delete comment error in api', error);
        
    }

}

export const editCommentAPI = async (postId:string|undefined,commentId:string|undefined,editedComment:string)=>{
    try {
        return await axiosInstance.put('/user/editComment',{postId,commentId,editedComment})
    } catch (error) {
        console.log('edit comment error ',error);
    }
}

export const updateRatingAPI = async (postId:string|undefined,rating:any)=>{
    try {
        return await axiosInstance.put('/user/updateRating',{postId,rating})
    } catch (error) {
        console.log('updateRating error ',error);
    }
}
export const savePostAPI = async (postId:string|undefined,isSave:boolean)=>{
    try {
        return await axiosInstance.put('/user/saveOrUnSavePost',{postId,isSave})
    } catch (error) {
        console.log('save post api error in postAPI page:',error);
        
    }
}
export const isPostSavedAPI = async (postId:string|undefined)=>{
    try {
        return await axiosInstance.get(`/user/isPostSaved?postId=${postId}`)
    } catch (error) {
        console.log('is post saved  api error in postAPI page:',error);
        
    }
}
