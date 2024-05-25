import { adminFormData } from "../Interfaces/interfaces";
import adminAxiosInstance from "../services/adminAxios";

export const adminLoginAPI =async (adminFormData:adminFormData)=>{
    try {
        return adminAxiosInstance.post('/admin/adminlogin',adminFormData)
    } catch (error) {
        console.log('admin login error :',error);
        
    }
}

export const fetchDashBoardCountAPI =async ()=>{
    try {
        return adminAxiosInstance.get('/admin/fetchDashBoardCount')
    } catch (error) {
        console.log('fetchDashBoardCountAPI  error :',error);   
    }
}

export const fetchDashBoardGraphDataAPI = async (DataType:string,DateType:string)=>{
    try {
        const response = await adminAxiosInstance.get(`/admin/fetchDashBoardGraphData`, {
            params: {
              DataType,
              DateType
            }
          });
          return response
    } catch (error) {
        console.log('fetchDashBoardGraphDataAPI error:',error);
        
    }
   
}

export const fetchAllUserDataAPI = async (userType:string)=>{
    try {
        const response = await adminAxiosInstance.get(`/admin/fetchAllUserData`,{params:{userType}})
          return response
    } catch (error) {
        console.log('fetchAllUserDataAPI error:',error);
        
    }
}

export const fetchUserDataAPI = async (userId:any,userType:any)=>{
    try {
     
      return await adminAxiosInstance.get('/admin/getUserData',{
        params:{userId,userType}
      })
    } catch (error) {
      console.log('fetch user data for edit profile in User API:',error);
      
      throw error
    }
  }

  
export const updateUserDataAPI = async (userData:any,userId:any,userType:any)=>{
    try {
      return await adminAxiosInstance.put('/admin/updateUserData',userData,{
        params:{userId,userType}
      })
    } catch (error) {
      console.log('update user data for edit profile in User API:',error);
      throw error
    }
  }

  export const uploadadminSideImgAPI = async (fileURL:string,userId:any,userType:any)=>{
    try {    
      return await adminAxiosInstance.put('/admin/uploadImg',{fileURL},{params:{userId,userType}})
    } catch (error) {
      console.log('uploadImgAPI error :',error);
      throw error
    }
  }

  export const handleBolckOrUnBlockAPI = async (userId:any,userType:any)=>{
    try {    
      return await adminAxiosInstance.put('/admin/handleBlockOrUnblock',{},{params:{userId,userType}})
    } catch (error) {
      console.log('uploadImgAPI error :',error);
      throw error
    }
  }

  export const fetchAllBookingDataAPI = async ()=>{
    try {
        const response = await adminAxiosInstance.get(`/admin/fetchAllBookingData`)
          return response
    } catch (error) {
        console.log('fetchAllUserDataAPI error:',error);
        
    }
  }

  export const fetchAllPostReportDataAPI = async ()=>{
    try {
        const response = await adminAxiosInstance.get(`/admin/fetchAllPostReportData`)
          return response
    } catch (error) {
        console.log('fetchAllUserDataAPI error:',error);
        
    }
  }

  export const findUserPostByIdAPI = async (postId:any,isDeleted:any)=>{
    try {
        const response = await adminAxiosInstance.get(`/admin/findUserPostById`,{params:{postId,isDeleted}})
        return response
    } catch (error) {
        console.log('fetchAllUserDataAPI error:',error);
        
    }
  }

  export const AdminDeletePostAPI = async(postId:string|undefined|null)=>{
    try {

        return await adminAxiosInstance.delete(`/admin/adminDeletePost?postId=${postId}`)
    } catch (error) {
        console.log('delete post  api error in postAPI page:',error);
    }
}
