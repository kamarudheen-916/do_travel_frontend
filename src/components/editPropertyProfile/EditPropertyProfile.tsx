import { useState } from "react"
import Input from "../atoms/Input/Input"
import { PropertyFormData } from "../../Interfaces/interfaces";
import AddToArray from "../atoms/addToArrayInput/AddToArray";
import {ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PropertyPartProps {
  setPropertyFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  propertyFormData:PropertyFormData
}

const  EditPropertyProfile : React.FC<PropertyPartProps>=({setPropertyFormData,propertyFormData})=> {

  // const [licensePreview,setLicensePreview] = useState<string|null>(null)
  // const [profilePreview,setProfilePreview] = useState<string|null>(null)
  // const [typeOfStays,setTypeOfStays] = useState<string[]>([''])
  // const [speciality,setSpeciality] = useState<string[]>([''])
  const [stay, setStay] = useState<string>('');
  const [speciality_, setSpeciality_] = useState<string>('');

  const ErrorNotify = (message:string) => toast.error(message,{
    position:"top-center",
    autoClose:1000,
    hideProgressBar:true
   });
  const handlePropertyChange = (e :React.ChangeEvent<HTMLInputElement>) =>{
      setPropertyFormData((previous)=>({
        ...previous,
        [e.target.name] : e.target.files ? e.target.files[0] : e.target.value
      }))
      // const file = e.target.files?.[0]; 
      // if (file) {
      //     const imageUrl = URL.createObjectURL(file); 
      //     e.target.name === 'license' ?
      //     setLicensePreview(imageUrl) 
      //     : setProfilePreview(imageUrl)
      // }
  }

//   const handlePropertyImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const base64String = event.target?.result as string
//             setPropertyFormData(prev =>({
//                 ...prev,
//                 [e.target.name] : base64String 
//             }))
//         };
//         reader.readAsDataURL(file)
       
//     }
   
// };

  // const handleAddStay = ()=>{
  //   setTypeOfStays(previous => [...previous,''])
  // }
  // const handleRemoveStay =(index:number)=>{
  //   setTypeOfStays(PrevState =>PrevState.filter((_,i)=>i!==index))
  // }
  // const handleAddStayChange =(index:number,value:string)=>{
  //     const updatedStay = [...typeOfStays]
  //     updatedStay[index] = value
  //     setTypeOfStays(updatedStay)
  //     setPropertyFormData(previous =>({
  //       ...previous,
  //       TypeOfStay : [...updatedStay]
  //     }))
  // }


  
  // const handleAddSpeciality = ()=>{
  //   setSpeciality(previous => [...previous,''])
  // }

  // const handleRemoveSpeciality =(index:number)=>{
  //   setSpeciality(PrevState =>PrevState.filter((_,i)=>i!==index))
  // }
  
  // const handleAddSpecialityChange =(index:number,value:string)=>{
  //     const updatedSpeciality = [...speciality]
  //     updatedSpeciality[index] = value
  //     setSpeciality(updatedSpeciality)
  //     setPropertyFormData(previous =>({
  //       ...previous,
  //       Speciality : [...updatedSpeciality]
  //     }))
  // }

  const handleAddTypeOfStay = () => {
    if(propertyFormData.TypeOfStay.length > 5 ){
      return ErrorNotify('Maximum limit is 5')
    }
    if (stay.trim() !== '') {      
      setPropertyFormData(prev => ({
        ...prev,
        TypeOfStay: [...prev.TypeOfStay,stay]
      }));
      setStay('');
    }
  };

  const handleAddSpecialitys = () => {
    if(propertyFormData.Speciality.length > 5 ){
      return ErrorNotify('Maximum limit is 5')
    }
    if (speciality_.trim() !== '') {      
      setPropertyFormData(prev => ({
        ...prev,
        Speciality: [...prev.Speciality,speciality_]
      }));
      setSpeciality_('');
    }
  };
  const removeTypesOfStay =(index:number)=>{
    try {
      const stays = [...propertyFormData.TypeOfStay]
      stays.splice(index,1)
      setPropertyFormData(prev =>({
        ...prev,
        TypeOfStay :[...stays]
      }))
    } catch (error) {
      console.log('remove Favorite Places error :',error);
    }
  }
  const removeSpecilitys =(index:number)=>{
    try {
      const speciality = [...propertyFormData.Speciality]
      speciality.splice(index,1)
      setPropertyFormData(prev =>({
        ...prev,
        Speciality :[...speciality]
      }))
    } catch (error) {
      console.log('remove Favorite Places error :',error);
    }
  }
  return (
    <div className="flex justify-evenly w-full p-4 text-black gap-3">
        <ToastContainer/>
            <div className="w-96">
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
            <Input 
              value={propertyFormData.Address}
              required={true}  
              errorLabelValue={"Addres is required..!"} 
              onChange={handlePropertyChange} 
              type={'text'} 
              title={'Address'} 
              name={'Address'} 
              id={'Address'}  
              placeholder={'Enter Your Address'} height="70px"
            />
            </div>
           <div>
           <Input 
              value={propertyFormData.startedDate}
              required={true}
              onChange={handlePropertyChange} 
              type={'date'} 
              title={'Started Date'} 
              name={'startedDate'} 
              id={'startedDate'}  
            />
             <Input 
              value={propertyFormData.MobileNumber}
              errorLabelValue={"Mobile Number must be valid"} 
              onChange={handlePropertyChange} 
              type={'number'} 
              title={'Mobile Number'} 
              name={'MobileNumber'} 
              id={'MobileNumber'}  
              placeholder={'Enter Your Mobile Number'}
            />
            
            <div className="TypesOfStay border-y ">
                <AddToArray 
                inputvalue={stay} 
                handleInputValue={setStay} 
                handleAddToArray={handleAddTypeOfStay}
                arrayData={propertyFormData.TypeOfStay}
                removeFromArray={removeTypesOfStay}
                title="Types of stays"
                id="TyepeOfStays"
                name="TyepeOfStays"
                placeholder="Enter Type of stays "
                />
                {/* {
              typeOfStays.map((stay,index)=>(
                <div  key={index} className="flex items-center">
                  <div className='flex-1 w-80'>
                  <Input 
                    
                    type={'text'}
                    title={`Type of stay ${index +1}`}
                    name={`TypeOfStay${index}`}
                    id={`TypeOfStay${index}`}
                    placeholder={`Enter Type of Stay ${index + 1}`}
                    value={stay}
                    onChange={(e)=>handleAddStayChange(index,e.target.value)}
                  />
                  </div>
                 { index === typeOfStays.length-1 && (<i
                      key={`plus-${index}`}
                      className="fa-solid fa-circle-plus flex-initial"
                      style={{ color: 'white', marginLeft: '20px', fontSize: '25px', marginTop: '10px' }}
                      onClick={handleAddStay} // Call function to add another input field
                  ></i>)}
                  {index !== typeOfStays.length - 1 && ( // Render plus icon only for the last input field
                      <i
                          key={`xmark-${index}`}
                          className="fa-solid fa-circle-xmark"
                          style={{ color: 'white', marginLeft: '20px', fontSize: '25px', marginTop: '10px' }}
                          onClick={()=>handleRemoveStay(index)} // Call function to add another input field
                      ></i>
                  )}
                </div>
              ))
            
            } */}
            </div>
            <div className="YourSpecialities border-b">
            <AddToArray 
                inputvalue={speciality_} 
                handleInputValue={setSpeciality_} 
                handleAddToArray={handleAddSpecialitys}
                arrayData={propertyFormData.Speciality}
                removeFromArray={removeSpecilitys}
                title="Specialities"
                id="TyepeOfStays"
                name="TyepeOfStays"
                placeholder="Enter Your Specialities "
                />
              {/* {
              speciality.map((stay,index)=>(
                <div  key={index} className="flex items-center">
                  <div className='flex-1 w-80'>
                  <Input 
                    
                    type={'text'}
                    title={`Speciality ${index +1}`}
                    name={`Speciality${index}`}
                    id={`Speciality${index}`}
                    placeholder={`Enter Your Speciality ${index + 1}`}
                    value={stay}
                    onChange={(e)=>handleAddSpecialityChange(index,e.target.value)}
                  />
                  </div>
                 { index === speciality.length-1 && (<i
                      key={`plus-${index}`}
                      className="fa-solid fa-circle-plus flex-initial"
                      style={{ color: 'white', marginLeft: '20px', fontSize: '25px', marginTop: '10px' }}
                      onClick={handleAddSpeciality} // Call function to add another input field
                  ></i>)}
                  {index !== speciality.length - 1 && ( // Render plus icon only for the last input field
                      <i
                          key={`xmark-${index}`}
                          className="fa-solid fa-circle-xmark"
                          style={{ color: 'white', marginLeft: '20px', fontSize: '25px', marginTop: '10px' }}
                          onClick={()=>handleRemoveSpeciality(index)} // Call function to add another input field
                      ></i>
                  )}
                </div>
              ))
            
            } */}
            </div>
            {/* <div className='upload_lisence flex items-center'>
                <Input  
                        required={true}
                        errorLabelValue={'This field must not be empty..!'}
                        type={'file'}
                        title={'License'}
                        name={'license'}
                        id={'license'}
                        height='60px'
                    
                        placeholder={'Enter Your Mobile Number '}
                        multiple={false}
                        onChange={handlePropertyImage} 
                    />
                    {licensePreview && <img src={licensePreview} alt="" style={{ marginLeft:'10px',marginTop:'10px',borderRadius:'5px',width: '30%', height: 'auto', maxHeight: '60px' }}  />}
                    {!licensePreview &&<div className='flex items-center justify-center'  style={{ marginLeft:'10px',marginTop:'10px',borderRadius:'5px',width: '30%', height: '60px', maxHeight: '60px', backgroundColor:'white'}} >
                    <i className="fa-solid fa-file" style={{fontSize:'40px'}}></i>
                    </div>}
                    
              </div>  */}
              {/* <div className='upload_Profile flex items-center'>
                <Input
                        required={true}
                        errorLabelValue={'This field must not be empty..!'}
                        type={'file'}
                        title={'Profile'}
                        name={'PropertyProfile'}
                        id={'Profile'}
                        height='60px'
                    
                        placeholder={'Enter Your Mobile Number '}
                        multiple={false}
                        onChange={handlePropertyImage} 
                    />
                    {profilePreview && <img src={profilePreview} alt="" style={{ marginLeft:'10px',marginTop:'10px',borderRadius:'5px',width: '30%', height: 'auto', maxHeight: '60px' }}  />}
                    {!profilePreview &&<div className='flex items-center justify-center'  style={{ marginLeft:'10px',marginTop:'10px',borderRadius:'5px',width: '30%', height: '60px', maxHeight: '60px', backgroundColor:'white'}} >
                    <i className="fa-solid fa-house" style={{fontSize:'40px'}}></i>
                    </div>}
                    
              </div> */}
           </div>

    </div>
  )
}

export default EditPropertyProfile
