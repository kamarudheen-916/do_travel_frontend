import {  useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {  adminFormData } from '../Interfaces/interfaces'

import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import Logo from '../components/Home/subHomeComponents/Logo/Logo'
import Input from '../components/atoms/Input/Input'
import Button from '../components/atoms/Button/Button'
import { adminLoginAPI } from '../API_admin/adminAPI'
import { ToastContainer, toast } from 'react-toastify';
import {  adminLogin } from '../reducers/adminSlice'

function AdminLogin() {
  

   const notifyError = (message:any) => toast.error(message,{
     position:"top-center",
     autoClose:1000,
     hideProgressBar:true
    });

  const Dispatch = useDispatch()
  const navigate = useNavigate()
  const [adminFormData,setAdminFormData]= useState <adminFormData>({
    adminName:'',
    password:'',
  })
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 

  const handleLoginSubmit = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    const loginResponse = await adminLoginAPI(adminFormData)
    if(loginResponse?.data.success){
      console.log('admin response :',loginResponse.data);
      
      Cookies.set('adminToken', loginResponse.data.token, { expires: 1 });
      Dispatch(adminLogin(loginResponse.data.token))
      navigate('/admin/adminHome')
    
    }else{
      notifyError(loginResponse?.data.message)
    }
  }
  return (
    <div className='w-full flex justify-center items-center mt-20  ' >
                  <div>
                <ToastContainer/>
              </div>
                  <form onSubmit={(e:any)=>handleLoginSubmit(e)} action="" className='LoginForm px-14 py-10  rounded-lg border-2 border-green-600'>
                  <div className=' text-2xl mb-6 font-bold  text-center '>
                    <div><Logo /></div>
                    <h1 style={{ color: 'var(--icon-color)' }}>Admin Login</h1>
                    </div>
                       
                      
                        <Input 
                          required={true} 
                          value={adminFormData.adminName} 
                          errorLabelValue={'It should be a valid name !'} 
                          onChange={handleLoginChange} 
                          type={'text'}
                          title={'Admin Name'}
                          name={'adminName'}
                          placeholder='Enter Admin Name...'
                        />
                        <Input 
                          pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                          required={true} 
                          value={adminFormData.password} 
                          errorLabelValue={'Invalid password!'} 
                          onChange={handleLoginChange} 
                          type={'password'} 
                          title={'Password'} 
                          name={'password'}
                          placeholder='Enter Password'
                        />
                        <div>
                            <Button  bgcolor='#178834' font_color='#ffff' name={'Submit'}/>
                        </div>
                       
                  </form>
                </div>
  )
}

export default AdminLogin
