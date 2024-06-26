import { Link, useNavigate } from 'react-router-dom'
import Button from './atoms/Button/Button'
import Input from './atoms/Input/Input'
import React, { useEffect, useState } from 'react'
import { ResendOTP, verifyOTPApi } from '../APIs/UserAPI'
import { useLocation } from 'react-router-dom'
import Logo from './Home/subHomeComponents/Logo/Logo'
import { ToastContainer, toast } from 'react-toastify';
function OtpForm() {
  const notifySuccess = (message:string) => toast.success(message,{
    position:"top-center",
    autoClose:1000,
    hideProgressBar:true,

   });
   const notifyConfirmOtp = (message:string) => toast.success(message,{
    position:"top-center",
    autoClose:1000,
    hideProgressBar:true,
    onClose:()=>navigate('/login')
   });
   const notifyError = (message:any) => toast.error(message,{
     position:"top-center",
     autoClose:1000,
     hideProgressBar:true
    });
  const { state } = useLocation();  
  const navigate = useNavigate()
  const [OTP,setOTP] = useState<string>()
  const [minutes,setMinutes] = useState(1)
  const [seconds,setSeconds] = useState(30)
  const OTPData = {
    OTP,
    ...state
  }


  useEffect(()=>{
     const intervel = setInterval(()=>{
      if(seconds>0){
        setSeconds(seconds -1)
      }

      if(seconds ===0){
        if(minutes ===0){
          clearInterval(intervel)
        }else{
          setSeconds(59)
          setMinutes(minutes-1)
        }
      }
     },1000)

     return ()=>{
      clearInterval(intervel)
     }
  },[seconds])
  const otpChange =(e:React.ChangeEvent<HTMLInputElement>)=>{ 
    setOTP(e.target.value)
  }
  const handleOTP = async(e:React.ChangeEvent<HTMLFormElement>) =>{
      e.preventDefault()
      const response = await verifyOTPApi(OTPData)  
      if(response.data.success){
        notifyConfirmOtp(response.data.message)
        
      }else{
        notifyError(response.data.message)
      }
  }
  const handleResendOTP = async (e:any)=>{
    e.preventDefault()
    setMinutes(0)
    setSeconds(30)
    if(OTPData.userType === undefined){
      notifyError('Please try again..!')
      navigate ('/login')
    }else{
      const response = await ResendOTP(OTPData.userType,OTPData.email)
      console.log('REasend ',response);
      
      if(response){
        notifySuccess(response.data.message)
      }else{
        notifyError(response)
      }
    }
  }
  return (
    <div>
        <div>
      <ToastContainer/>
    </div>
            <div>
            <div className='w-full flex justify-center items-center mt-20' >
                  <form action=""  className='LoginForm p-8    rounded-lg border-2 border-green-600'>
                  <div className=' text-2xl mb-6 font-bold  text-center '>
                    <div><Logo /></div>
                    <h1 style={{ color: 'var(--icon-color)' }}>Login</h1>
                    </div>
                        <Input onChange={(e)=>otpChange(e)} placeholder='Enter OTP' type={'text'} title={'Enter OTP'} name={'otp'}/>
                        <div>
                            <Button bgcolor='#178834' font_color='#ffff' onSubmit={handleOTP} name={'Submit'}/>
                        </div>
                        <div className='mt-5 text-center'>
                          <div>
                            <Link className='text-blue-200 mr-4' to={'/login'}>Cancel</Link>
                          </div>
                          <div className='text-red-500'>
                              <p>Time Remaining : {' '}
                              { minutes < 10 ?`0${minutes}`: minutes}:
                              {seconds < 10 ?`0${seconds}`: seconds}
                              </p>
                           {seconds === 0 && minutes === 0 && <a className='text-blue-200 ml-4 cursor-pointer' onClick={(e)=>handleResendOTP(e)} >Resend OTP</a>}

                          </div>
                        </div>
                  </form>
                </div>
    </div>
    </div>
  )
}

export default OtpForm
