
import axios,{AxiosInstance} from "axios"
import {UserFormData,PropertyFormData, LoginFormData,forgetFormData} from '../Interfaces/interfaces'

const axiosInstance : AxiosInstance =  axios.create({
    baseURL:'http://localhost:3000/api'
})

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