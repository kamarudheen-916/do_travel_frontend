import { Link, useNavigate } from 'react-router-dom'
import Button from '../atoms/Button/Button'
import Input from '../atoms/Input/Input'
import { useState } from 'react';
import { forgetFormData } from '../../Interfaces/interfaces';
import { forgottenAPI } from '../../APIs/api';

function ForgottenForm() {
  const navigate = useNavigate()
  const [userType, setUserType] = useState<string>('user'); 
  const handleUserTypeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
};
const [forgetFormData,setforgetFormData]= useState <forgetFormData>({
  email:'',
  password:'',
  confirmPassword:''
})

const handleforgottenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setforgetFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleForgotterSubmit =async (e:React.ChangeEvent<HTMLFormElement>) =>{
  e.preventDefault()
  const forgotenResponse = await forgottenAPI({forgetFormData,userType})
  if(forgotenResponse.data.success){
    const {email,hashedPassword,userType} = forgotenResponse.data
    navigate('/otp', { state: { email,hashedPassword,userId:'',userType,isForgotten:true } });
  }else{
    alert(forgotenResponse.data.message)
  }
}
  return (
    <div>
            <div className='w-full flex justify-center items-center mt-20' >
                  <form action="" onSubmit={(e:React.ChangeEvent<HTMLFormElement>)=>handleForgotterSubmit(e)} className='LoginForm p-8  rounded '>
                      <div className='text-white text-2xl mb-10 font-bold text-center'>Forgotten Password</div>
                      <div className='flex justify-around text-white mb-3'>
                            <div className='flex justify-around w-full border-2 rounded-md'>
                                <label htmlFor="userRadio">User</label>
                                <input
                                        
                                        type="radio"
                                        name="userOrNot"
                                        id="userRadio"
                                        value="user"
                                        checked={userType === 'user'} // Check if the user type is 'user'
                                        onChange={handleUserTypeChange} // Update user type when radio button is clicked
                                    />    
                            </div>  
                            <div className='flex justify-around w-full border-2 rounded-md'>
                                <label htmlFor="properyRadio">Property</label>
                                <input
                                        type="radio"
                                        name="userOrNot"
                                        id="propertyRadio"
                                        value="property"
                                        checked={userType === 'property'} // Check if the user type is 'property'
                                        onChange={handleUserTypeChange} // Update user type when radio button is clicked
                                    /> 
                            </div>
                       </div>
                      <Input
                                required={true} 
                                value={forgetFormData.email} 
                                errorLabelValue={'It should be a valid email address!'} 
                                onChange={handleforgottenChange} 
                                type={'email'} 
                                title={'Email'} 
                                name={'email'} 
                                id={'email'}  
                                placeholder={'Enter Your Email'}
                             />
                            
                            <Input
                                pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                                required={true} 
                                value={forgetFormData.password} 
                                errorLabelValue={'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!'} 
                                onChange={handleforgottenChange} 
                                type={'password'} 
                                title={'Password'} 
                                name={'password'} 
                                id={'password'}  
                                placeholder={'Enter Your New Password'}
                            />
                            <Input
                                pattern={forgetFormData.password}
                                required={true}  
                                errorLabelValue={"Passwords don't match!"} 
                                onChange={handleforgottenChange} type={'password'} 
                                title={'Confirm Password'} 
                                name={'confirmPassword'} 
                                id={'confirmPassword'}  
                                placeholder={'Confirm Your Password'} 
                            />
                        <div>
                            <Button  name={'Submit'}/>
                        </div>
                        <div className='mt-5 text-center'>
                          <Link className='text-blue-200 ' to={'/login'}>Back to Login</Link>
                        </div>
                  </form>
                </div>
    </div>
  )
}

export default ForgottenForm
