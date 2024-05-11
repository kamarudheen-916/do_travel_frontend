
import axiosInstance from "../services/axios"
import {UserFormData,PropertyFormData, LoginFormData,forgetFormData} from '../Interfaces/interfaces'

export const SignupApi = (FormData : UserFormData | PropertyFormData,route:string,userType:string):Promise<any>=>{
   return  axiosInstance.post(`/user/${route}`,{FormData,userType})
}

export const loginAPI = (formData: LoginFormData,userType:string)=>{
    return axiosInstance.post('/user/login',{formData,userType})
}

interface signupOTP {
    OTP:string|undefined,userId:string|undefined,userType:string|undefined,isForgottenPassword:boolean
}
interface forgetPassOTP {
    userId:string,email:string,hashedPassword:string, userType:string,isForgottenPassword:boolean
}

export const verifyOTPApi = (OTPdata:signupOTP|forgetPassOTP)=>{
    return OTPdata.isForgottenPassword ===false ?
     axiosInstance.post(`/user/verifyOTP/${OTPdata.userId}`, OTPdata):
     axiosInstance.post(`/user/verifyForgetOTP`,OTPdata)
}
export const ResendOTP = async (userType: string, email: string) => {
    try {
        
      return axiosInstance.post(`/user/ResendOtp/${userType}/${email}`, { });
    } catch (error) {
      console.error('Error resending OTP:', error);
      throw error; // Rethrow the error to handle it in the calling code if needed
    }
  }
  
export const forgottenAPI = (data:{forgetFormData:forgetFormData,userType:string})=>{
    return axiosInstance.post(`/user/forgottenPassword`,data)
}

export const userCreateShareAPI =async (data:{fileUrl:string,textarea:string,userId:string|null,userType:string|null,userName:any,Profile:any})=>{
  return  await axiosInstance.post(`/user/userCreate`,data)
}

export const getAllPostsAPI= async () =>{
  try {
    return await axiosInstance.get(`/user/getAllPosts`)
  } catch (error) {
    console.log('getAllPostsAPI error :',error);
    throw error
  }
}
export const getAllFeedsAPI= async () =>{
  try {
    return await axiosInstance.get(`/user/getAllFeeds`)
  } catch (error) {
    console.log('getAllFeedsAPI error :',error);
    throw error
  }
}

export const getOthersProfilePostsAPI= async (profileId:any,profileType:any) =>{
  try {
    return await axiosInstance.get(`/user/getOthersProfilePosts?profileId=${profileId}&profileType=${profileType}`)
  } catch (error) {
    console.log('getOthersProfilePostsAPI error :',error);
    throw error
  }
}

export const uploadImgAPI = async (fileURL:string)=>{
  try {    
    return await axiosInstance.put('/user/uploadImg',{fileURL})
  } catch (error) {
    console.log('uploadImgAPI error :',error);
    throw error
  }
}

export const fetchDataAPI = async ()=>{
  try {
    return await axiosInstance.get('/user/getUserData')
  } catch (error) {
    console.log('fetch user data for edit profile in User API:',error);
    
    throw error
  }
}

export const updateDataAPI = async (userData:UserFormData|PropertyFormData)=>{
  try {
    return await axiosInstance.put('/user/updateUserData',userData)
  } catch (error) {
    console.log('update user data for edit profile in User API:',error);
    throw error
  }
}