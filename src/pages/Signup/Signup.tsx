
import Button from '../../components/atoms/Button/Button'
import './Signup.css'
import { Link,useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { SignupApi } from '../../APIs/UserAPI'
import Logo from '../../components/Home/subHomeComponents/Logo/Logo'
import { ToastContainer, toast } from 'react-toastify';
import Userpart from '../../components/signup/userpart.tsx'
import PropertyPart from '../../components/signup/PropertyPart.tsx'
function Signup() {
  
    const [userType, setUserType] = useState<string>('user'); 
    const navigate = useNavigate()
    
       const notifyError = (message:any) => toast.error(message,{
         position:"top-center",
         autoClose:1000,
         hideProgressBar:true
        });
    // const [isFormValid,setIsFormValid] = useState<boolean>(false)
    const [userFormData,setUserFormData] = useState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            isBlocked:false,
            gender:'',
            DOB:'',
            Country:'',
            State:'',
            MobileNumber:'',
            City:'',
            favoritePlace:[''] ,
            Profile: '',
            IsVerified:false,
            OTP:''
      })
      const [propertyFormData,setPropertyFormData] = useState({
            PropertyName: '',
            email: '',
            password: '',
            isBlocked:false,
            startedDate: '',
            Address:'',
            TypeOfStay:[''],
            Speciality:[''],
            MobileNumber:'',
            license:'' , 
            PropertyProfile: '',
            IsVerified:false,
            OTP:'',
  })
    const handleUserTypeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUserType(event.target.value); // Update the user type based on the selected radio button
    };
    const handleSubmit =async (e:React.ChangeEvent<HTMLInputElement>) =>{ 
        e.preventDefault()
        const formData = userType === 'user' ? userFormData : propertyFormData
        const route = userType === 'user' ? 'signup_user' : 'signup_property'
        const response = await SignupApi(formData,route,userType)
        console.log('response :',response)
       if(response.data.success){
        const userId = response.data.Data._id
        const email = response.data.Data.email
        navigate('/otp', { state: { userId, userType ,isForgottenPassword:false,email} });
       }else{
        notifyError(response.data.message)
       }
    }
  return (
    <div className='signup parant'>
          <div>
      <ToastContainer/>
    </div>
        <div className="center">
            <div className='SignUpform'>
                <form action="" onSubmit={(e:any)=>handleSubmit(e)}  className=' ' encType='multipart/form-data'>
                    <div className=' text-2xl mb-6 font-bold  '>
                    <div><Logo /></div>
                    <h1 style={{ color: 'var(--icon-color)' }}>Sign up</h1>
                    </div>
                    <div className='checkBox'>
                       <div className='flex justify-around gap-2 '>
                            <div className='flex justify-around w-full border-2 border-green-600 text-green-700  rounded-md'>
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
                            <div className='flex justify-around w-full border-2 border-green-600 text-green-700  rounded-md'>
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
                            {userType === 'user' && <Userpart userFormData={userFormData} setUserFormData={setUserFormData}  />}
                            {userType === 'property' && <PropertyPart propertyFormData={propertyFormData} setPropertyFormData={setPropertyFormData}/>}
                            <Button font_color='#ffff'  bgcolor='#178244' name='submit'/>
                        <div style={{textAlign:'center',marginTop:'10px'}}>
                            <Link className='' to={'/login'}>Already hava an account?</Link>
                        </div>
                       </div>
                </form>
            </div>
        </div>
       
    </div>
  )
}

export default Signup
