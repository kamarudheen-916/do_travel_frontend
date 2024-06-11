
import Input from "../atoms/Input/Input"
import { PropertyFormData } from "../../Interfaces/interfaces";


interface PropertyPartProps {
  setPropertyFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  propertyFormData:PropertyFormData
}

const  PropertyPart : React.FC<PropertyPartProps>=({setPropertyFormData,propertyFormData})=> {



  const handlePropertyChange = (e :React.ChangeEvent<HTMLInputElement>) =>{
      setPropertyFormData((previous)=>({
        ...previous,
        [e.target.name] : e.target.files ? e.target.files[0] : e.target.value
      }))
  }






  return (
    <div className="p-4 gap-3">
          <div>
          <Input 
              pattern='^[A-Za-z0-9\s]{3,16}$'
              required={true}
              value={propertyFormData.PropertyName} 
              errorLabelValue={"Propery name should be 3-16 characters and shouldn't include any special character!"}
              onChange={handlePropertyChange} 
              type={'text'} 
              title={'Property Name'} 
              name={'PropertyName'} 
              id={'PropertyName'} 
              placeholder={'Enter The Property Name'} 
            />
            <Input 
              required={true} 
              value={propertyFormData.email} 
              errorLabelValue={'It should be a valid email address!'} 
              onChange={handlePropertyChange} 
              type={'email'} 
              title={'Email'} 
              name={'email'} 
              id={'email'}  
              placeholder={'Enter Your Email'} 
            />
            <Input 
              pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
              required={true} 
              value={propertyFormData.password} 
              errorLabelValue={'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!'} 
              onChange={handlePropertyChange} 
              type={'password'} 
              title={'Password'} 
              name={'password'} 
              id={'password'}  
              placeholder={'Enter Your New Password'}
            />
            <Input 
              pattern={propertyFormData.password}
              required={true}  
              errorLabelValue={"Passwords don't match!"} 
              onChange={handlePropertyChange} 
              type={'password'} 
              title={'Confirm Password'} 
              name={'confirmPassword'} 
              id={'confirmPassword'}  
              placeholder={'Confirm Your Password'} 
            />
          </div>
    </div>
  )
}

export default PropertyPart
