import axiosInstance from "../services/axios";

export const followRequestAPI =async (requesterId:string|null,requesterType:any,followerId:string|undefined,followUserType:any)=> {
    try { 
        const isProperty = followUserType === 'user'? false : true
        const isRequesterProperty =requesterType ===  'user' ? false : true
        return await axiosInstance.post('/user/FollowRequest',{requesterId,isRequesterProperty,followerId,isProperty})
    } catch (error) {
        console.log('follow request API error :',error);
        throw error
    }
}
export const cancelFollowReqAPI = async(requesterId:string|null,otherProfileId:string|undefined)=>{
    try {
        return await axiosInstance.put('/user/cancelFollowReq',{requesterId,otherProfileId})
    } catch (error) {
        console.log('cancel follow request API error :',error);
        throw error
    }
}
export const unFollowAPI =async (requesterId:string|null,followerId:string|undefined,currentUserType:any)=> {
    try { 
        const isProperty = currentUserType === 'user'? false : true
        return await axiosInstance.put('/user/unFollowRequest',{requesterId,followerId,isProperty})
    } catch (error) {
        console.log('follow request API error :',error);
        throw error
    }
}

export const checkIsFollwoedAPI =async (requesterId:string|null,followerId:string|undefined,isProperty:boolean|undefined)=> {
    try {        
        return await axiosInstance.get(`/user/checkIsFollwoed?requesterId=${requesterId}&followerId=${followerId}&isProperty=${isProperty}`)
    } catch (error) {
        console.log('follow request API error :',error);
        throw error
    }

}

export const fetchFollwerRequestAPI =async (userId:string|null)=> {
    try {        
        return await axiosInstance.get(`/user/fetchFollwerRequest?userId=${userId}`)
    } catch (error) {
        console.log('is follow request API error :',error);
        throw error
    }
}
export const confirmFollReqAPI =async (followerId:string,userId:string|null)=> {
    try {        
        return await axiosInstance.post(`/user/confirmFollReq`,{followerId,userId})
    } catch (error) {
        console.log('is follow request API error :',error);
        throw error
    }
}
export const cancelFollReqAPI =async (followerId:string|null,followingId:string|undefined|null)=> {
    try {        
        return await axiosInstance.put(`/user/cancelFollReq`,{followerId,followingId})
    } catch (error) {
        console.log('is follow request API error :',error);
        throw error
    }
}

export const fetchFollowDataAPI =async (userId:string|null|undefined)=> {
    try {        
        return await axiosInstance.get(`/user/fetchAllFollowdata?userId=${userId}`)
    } catch (error) {
        console.log('fetch follow data  API error :',error);
        throw error
    }
}
export const fetchFDataAPI =async (userId:string|undefined|null,isFollwoing:boolean)=> {
    try {        
        return await axiosInstance.get(`/user/fetchFollowerOriginalData?isFollowing=${isFollwoing}&userId=${userId}`)
    } catch (error) {
        console.log('fetch follow data  API error :',error);
        throw error
    }
}