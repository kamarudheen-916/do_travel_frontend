import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { LoginFormData } from '../Interfaces/interfaces'
import { loginAPI } from '../APIs/UserAPI'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import Logo from '../components/Home/subHomeComponents/Logo/Logo'
import Input from '../components/atoms/Input/Input'
import Button from '../components/atoms/Button/Button'
import { ToastContainer, toast } from 'react-toastify';
function AdminSignup() {
 
   const notifyError = (message:any) => toast.error(message,{
     position:"top-center",
     autoClose:1000,
     hideProgressBar:true
    });
  const [userType, setUserType] = useState<string>('user'); 
  const handleUserTypeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
};
  const Dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginFormData,setLoginFormData]= useState <LoginFormData>({
    email:'',
    password:'',
  })
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 

  const handleLoginSubmit = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    const loginResponse = await loginAPI(loginFormData,userType)
    if(loginResponse.data.success){
      localStorage.setItem('token',loginResponse.data.token)
      if(userType === 'user'){
        localStorage.setItem('userName',loginResponse.data.user.firstName)
        localStorage.setItem('userProfile',loginResponse.data.user.Profile)
        localStorage.setItem('userId',loginResponse.data.user._id)
        localStorage.setItem('userType',userType)
        Cookies.set('userType',userType)
        }
        else{
        localStorage.setItem('userName',loginResponse.data.user.PropertyName)
        localStorage.setItem('userProfile',loginResponse.data.user.PropertyProfile)
        localStorage.setItem('userId',loginResponse.data.user._id)
        localStorage.setItem('userType',userType)
        Cookies.set('userType',userType)
        }
      Dispatch({type:'login_successful',payload:loginResponse.data.token})
      navigate('/')
    }else{
      notifyError(loginResponse.data.message)
    }
  }
  return (
    <div className='w-full flex justify-center items-center mt-20 ' >
        <div>
      <ToastContainer/>
    </div>
                  <form onSubmit={(e:any)=>handleLoginSubmit(e)} action="" className='LoginForm px-6 py-3  rounded-lg border-2 border-green-600'>
                  <div className=' text-2xl mb-6 font-bold  text-center '>
                    <div><Logo /></div>
                    <h1 style={{ color: 'var(--icon-color)' }}>Admin Signup</h1>
                    </div>
                       
                      
                        <Input 
                          required={true} 
                          value={loginFormData.email} 
                          errorLabelValue={'It should be a valid email address!'} 
                          onChange={handleLoginChange} 
                          type={'email'}
                          title={'User Email'}
                          name={'email'}
                          placeholder='Enter Admin Email'
                        />
                        <Input 
                          pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                          required={true} 
                          value={loginFormData.password} 
                          errorLabelValue={'Invalid password!'} 
                          onChange={handleLoginChange} 
                          type={'password'} 
                          title={'Password'} 
                          name={'password'}
                          placeholder='Enter Password'
                        />
                          <Input 
                          pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                          required={true} 
                          value={loginFormData.password} 
                          errorLabelValue={'Invalid password!'} 
                          onChange={handleLoginChange} 
                          type={'password'} 
                          title={'Password'} 
                          name={'password'}
                          placeholder='Enter Password'
                        />
                          <Input
                            pattern={loginFormData.password}
                            required={true}
                            errorLabelValue={"Passwords don't match!"}
                            onChange={handleLoginChange}
                            type={"password"}
                            title={"Confirm Password"}
                            name={"confirmPassword"}
                            id={"confirmPassword"}
                            placeholder={"Confirm Your Password"}
                            />
                        <div>
                            <Button  bgcolor='#178834' font_color='#ffff' name={'Submit'}/>
                        </div>
                        <div className='mt-5 flex justify-between'>
                          <Link className='text-green-400 mr-6' to={'/forgottenPassword'}>Forgotten Password?</Link>
                          <Link className='text-green-400 ' to={'/signup'}>Create New Account</Link>
                        </div>
                        <div className='mt-6 text-center'>
                          <a href="" className='text-white '> <i className="fa-brands fa-google" style={{color:'white'}}></i> Login with google  </a>
                        </div>
                  </form>
                </div>
  )
}

export default AdminSignup
