import axiosInstance from "../services/axios";

export const submitCommentAPI = async (comment:string,postId:string|undefined)=>{
    try {
        return await axiosInstance.post('/user/postComment',{comment,postId})
    } catch (error) {
        console.log('submitCommentAPi error :',error);
        
    }
}

export const fetchRpleyCommentAPI = async (commentId:string)=>{
    try {
        return await axiosInstance.get('/user/fetchReplayComment',{params:{commentId}})
    } catch (error) {
        console.log('fetchRpleyCommentAPI error :',error);
        
    }
}
export const replayCommentAPI = async (postId:string|undefined,replayCommentId:any,replayComment:string)=>{
    try {
       
        return await axiosInstance.post('/user/postReplayComment',{postId,replayCommentId,replayComment})
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

export const likePostAPI = async (postId:string|undefined,isLiked:boolean)=>{
    try {        
        return await axiosInstance.put('/user/likeOrUnLikePost',{postId,isLiked})
    } catch (error) {
        console.log('save post api error in postAPI page:',error);
        
    }
}
export const isPostLikedAPI = async (postId:string|undefined)=>{
    try {
        return await axiosInstance.get(`/user/isPostLiked?postId=${postId}`)
    } catch (error) {
        console.log('is post saved  api error in postAPI page:',error);
        
    }
}


export const fetchPostLikersDataAPI = async (postId:string|undefined|null)=>{
    try {
        return await axiosInstance.get(`/user/fetchPostLikersData?postId=${postId}`)
    } catch (error) {
        console.log('is post saved  api error in postAPI page:',error);
        
    }
}

export const deletePostAPI = async(postId:string|undefined|null)=>{
    try {
        return await axiosInstance.delete(`/user/deletePost?postId=${postId}`)
    } catch (error) {
        console.log('delete post  api error in postAPI page:',error);
    }
}

export const reportPostAPI = async (data:any)=>{
    try {
        const response = await axiosInstance.post(`/user/reportPost`,data)
          return response
    } catch (error) {
        console.log('reportPostAPI error:',error);
        
    }
}