import React from "react";
import Input from "../atoms/Input/Input";
import "../../pages/Signup/Signup.css";
import { useEffect, useState } from "react";
import { UserFormData } from "../../Interfaces/interfaces";
import axios from "axios";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserPartProps {
  setUserFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
  userFormData: UserFormData;
}

const userpart: React.FC<UserPartProps> = ({
  userFormData,
  setUserFormData,
}) => {
  const ErrorNotify = (message:string) => toast.error(message,{
    position:"top-center",
    autoClose:1000,
    hideProgressBar:true
   });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string>('');
  // const [favoritePlace, setFavoritePlaces] = useState<string[]>([]);

  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserFormData((prev) => ({
      ...prev,
      Country: e.target.value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setUserFormData((prev) => ({
          ...prev,
          [e.target.name]: base64String,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      const { name, value } = e.target;
      setUserFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddFavoritePlaces = () => {
    if(userFormData.favoritePlace.length > 5 ){
      return ErrorNotify('Maximum limit is 5')
    }
    if (favorites.trim() !== '') {      
      setUserFormData(prev => ({
        ...prev,
        favoritePlace: [...prev.favoritePlace,favorites]
      }));
      setFavorites('');
    }
  };
  const removeFavoritePlaces =(index:number)=>{
    try {
      const favorites = userFormData.favoritePlace
      favorites.splice(index,1)
      console.log(favorites);
      
      setUserFormData(prev =>({
        ...prev,
        favoritePlace :[...favorites]
      }))
    } catch (error) {
      console.log('remove Favorite Places error :',error);
      
    }
  }
  


  const handleFavoritePlacesChange = (e:React.ChangeEvent<HTMLInputElement>) => {   
    setFavorites(e.target.value);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countriesName = response.data.map(
          (country: any) => country.name.common
        );
        const sortedCountryNames = countriesName.sort((a: string, b: string) =>
          a.localeCompare(b)
        );
        setCountries(sortedCountryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div>
      <div className="userPart flex p-4 text-black gap-3">
       <div className="w-full">
       <Input
          pattern="^[A-Za-z0-9]{3,16}$"
          required={true}
          value={userFormData.firstName}
          errorLabelValue={
            "First name should be 3-16 characters and shouldn't include any special character!"
          }
          onChange={(e) => handleChange(e)}
          type={"text"}
          title={"First Name"}
          name={"firstName"}
          id={"firstName"}
          placeholder={"Enter firstname"}
        />
        <Input
          pattern="^[A-Za-z0-9]{1,16}$"
          required={true}
          value={userFormData.lastName}
          errorLabelValue={
            "Last name should be 3-16 characters and shouldn't include any special character!"
          }
          onChange={handleChange}
          type={"text"}
          title={"Last Name"}
          name={"lastName"}
          id={"lastName"}
          placeholder={"Enter Your Last Name"}
        />
        <Input
          required={true}
          value={userFormData.email}
          errorLabelValue={"It should be a valid email address!"}
          onChange={handleChange}
          type={"email"}
          title={"Email"}
          name={"email"}
          id={"email"}
          placeholder={"Enter Your Email"}
        />
        <Input
          pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
          required={true}
          value={userFormData.password}
          errorLabelValue={
            "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
          }
          onChange={handleChange}
          type={"password"}
          title={"New Password"}
          name={"password"}
          id={"password"}
          placeholder={"Enter Your New Password"}
        />
        <Input
          pattern={userFormData.password}
          required={true}
          errorLabelValue={"Passwords don't match!"}
          onChange={handleChange}
          type={"password"}
          title={"Confirm Password"}
          name={"confirmPassword"}
          id={"confirmPassword"}
          placeholder={"Confirm Your Password"}
        />
       
       </div>
       
      </div>
    </div>
  );
};

export default userpart;
