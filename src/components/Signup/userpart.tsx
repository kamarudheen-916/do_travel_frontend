import React from 'react'
import Input from '../atoms/Input/Input'
import Dropdown from '../atoms/DropDown/DropDown'
import './Signup.css'
import { useEffect, useState } from 'react'
import { UserFormData } from '../../Interfaces/interfaces'
import axios from 'axios'


interface UserPartProps {
    setUserFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
    userFormData:UserFormData
}

const  userpart : React.FC<UserPartProps> = ({userFormData,setUserFormData}) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [countries,setCountries] = useState<string[]>([])
    const [favoritePlaces, setFavoritePlaces] = useState(['']);

    const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserFormData(prev => ({
            ...prev,
            Country: e.target.value 
        }));
    }
    
    const handleChange =(e :  React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); 
            setSelectedImage(imageUrl); 
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target?.result as string
                setUserFormData(prev =>({
                    ...prev,
                    [e.target.name] : base64String 
                }))
            };
            reader.readAsDataURL(file)
        
        }else{
            const {name,value} = e.target
            setUserFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
            }
    }

    const handleAddInputField = () => {
        setFavoritePlaces(prevState => [...prevState, '']); 
    };
    
    const handleDeleteInputField = (index:number) => {
        setFavoritePlaces(prevState => prevState.filter((_, i) => i !== index));
    };

    const handleFavoritePlacesChange = (index:number, value:string) => {
        const updatedPlaces = [...favoritePlaces];
        updatedPlaces[index] = value; 
        setUserFormData((previous)=>({
            ...previous,
            favoritePlace:[...updatedPlaces]
        }))
        setFavoritePlaces(updatedPlaces); 
    };


    useEffect(()=>{
        const fetchCountries =async()=>{
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all')
                const countriesName = response.data.map((country:any)=>country.name.common)
                const sortedCountryNames = countriesName.sort((a:string, b:string) => a.localeCompare(b));
                setCountries(sortedCountryNames)
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        }
        fetchCountries()
    },[])

  return (
    <div>
        <div className='userPart'>
                        
                            <Input
                                pattern='^[A-Za-z0-9]{3,16}$'
                                required={true}
                                value={userFormData.firstName} 
                                errorLabelValue={"First name should be 3-16 characters and shouldn't include any special character!"}
                                onChange={(e)=>handleChange(e)} 
                                type={'text'} title={'First Name'}
                                name={'firstName'} 
                                id={'firstName'} 
                                placeholder={'Enter Your First Name'} 
                            />
                            <Input
                                pattern='^[A-Za-z0-9]{1,16}$'
                                required={true} 
                                value={userFormData.lastName} 
                                errorLabelValue={"Last name should be 3-16 characters and shouldn't include any special character!"}
                                onChange={handleChange} 
                                type={'text'} 
                                title={'Last Name'} 
                                name={'lastName'} 
                                id={'lastName'}  
                                placeholder={'Enter Your Last Name'}
                            />
                            <Input
                                required={true} 
                                value={userFormData.email} 
                                errorLabelValue={'It should be a valid email address!'} 
                                onChange={handleChange} 
                                type={'email'} 
                                title={'Email'} 
                                name={'email'} 
                                id={'email'}  
                                placeholder={'Enter Your Email'}
                             />
                            <Input
                                pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                                required={true} 
                                value={userFormData.password} 
                                errorLabelValue={'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!'} 
                                onChange={handleChange} 
                                type={'password'} 
                                title={'Password'} 
                                name={'password'} 
                                id={'password'}  
                                placeholder={'Enter Your New Password'}
                            />
                            <Input
                                pattern={userFormData.password}
                                required={true}  
                                errorLabelValue={"Passwords don't match!"} 
                                onChange={handleChange} type={'password'} 
                                title={'Confirm Password'} 
                                name={'confirmPassword'} 
                                id={'confirmPassword'}  
                                placeholder={'Confirm Your Password'} 
                            />
                            <div className=' flex items-center'>
                                <Input 
                                    required={true}
                                    value={userFormData.DOB} 
                                    onChange={handleChange} 
                                    type={'date'} 
                                    title={'Date of Birth'} 
                                    name={'DOB'} id='DOB' 
                                    width={'200px'} 
                                />
                                <div className='text-white flex items-center justify-between'>
                                     <label className='ml-2 mr-2' htmlFor="">Gender :</label>
                                <div className='ml-2 mr-2'>
                                    <input onChange={handleChange} className='ml-2 mr-2' value={'male'} type="radio" name="gender" id="male" />
                                    <label htmlFor="Male">Male</label>
                                </div>
                                <div>
                                    <input onChange={handleChange} className='ml-2 mr-2' value={'female'} type="radio" name="gender" id="female" />
                                    <label htmlFor="Female">Female</label>
                                </div>
                                </div>
                            </div>
                            <Dropdown 
                            required={true}
                            name='Country' 
                            options={countries}  
                            onSelect={handleCountrySelect} 
                            label={'Country'}
                            />
                            <Input 
                                required={true}
                                value={userFormData.State} 
                                errorLabelValue={'Must not be empty..!'}  
                                onChange={handleChange} 
                                type={'text'} 
                                title={'State'} 
                                name={'State'} 
                                id={'State'} 
                                placeholder={'Enter Your State '}
                            />
                            <Input 
                                required={true}
                                value={userFormData.City} 
                                errorLabelValue={'Must not be empty..!'} 
                                onChange={handleChange} 
                                type={'text'} 
                                title={'City'} 
                                name={'City'} 
                                id={'City'} 
                                placeholder={'Enter Your City '}
                            />
                            <Input 
                                value={userFormData.MobileNumber} 
                                errorLabelValue={'Must not be empty..!'} 
                                onChange={handleChange} 
                                type={'number'} 
                                title={'Mobile Number ( Optional )'} 
                                name={'MobileNumber'} 
                                id={'MobileNumber'} 
                                placeholder={'Enter Your Mobile Number '}
                            />
                            <div>
                                    {favoritePlaces.map((place, index) => (
                                        <div key={index} className='flex items-center'>
                                            <div className='flex-1 w-80'>
                                                <Input 
                                                    
                                                    type={'text'}
                                                    title={`Favorite Place ${index + 1} ( Optional )`}
                                                    name={`favoritePlace${index}`}
                                                    id={`favoritePlace${index}`}
                                                    placeholder={`Enter Favorite Place ${index + 1}`}
                                                    value={place}
                                                    onChange={(e) => handleFavoritePlacesChange(index, e.target.value)}
                                                />
                                            </div>
                                            {index === favoritePlaces.length - 1 && ( 
                                                <i
                                                    key={`plus-${index}`}
                                                    className="fa-solid fa-circle-plus flex-initial"
                                                    style={{ color: 'white', marginLeft: '20px', fontSize: '25px', marginTop: '10px' }}
                                                    onClick={handleAddInputField} 
                                                ></i>
                                            )}
                                            {index !== favoritePlaces.length - 1 && ( 
                                                <i
                                                    key={`xmark-${index}`}
                                                    className="fa-solid fa-circle-xmark"
                                                    style={{ color: 'white', marginLeft: '20px', fontSize: '25px', marginTop: '10px' }}
                                                    onClick={()=>handleDeleteInputField(index)} 
                                                ></i>
                                            )}
                                        </div>
                                    ))}
                            </div>  
                            <div className='flex items-center'>
                            <Input 
                                    type={'file'}
                                    title={'Profile ( Optional )'}
                                    name={'Profile'}
                                    id={'Profile'}
                                    height='60px'
                                
                                    // placeholder={'Enter Your Mobile Number '}
                                    multiple={false}
                                    onChange={handleChange} 
                                />
                                {selectedImage && <img src={selectedImage} alt="" style={{ marginLeft:'10px',marginTop:'10px',borderRadius:'5px',width: '30%', height: 'auto', maxHeight: '60px' }}  />}
                                {!selectedImage &&<div className='flex items-center justify-center'  style={{ marginLeft:'10px',marginTop:'10px',borderRadius:'5px',width: '30%', height: '60px', maxHeight: '60px', backgroundColor:'white'}} >
                                <i className="fa-solid fa-user" style={{fontSize:'40px'}}></i>
                                </div>}
                                
                             </div>                                            
                        </div>
    </div>
  )
}

export default userpart
