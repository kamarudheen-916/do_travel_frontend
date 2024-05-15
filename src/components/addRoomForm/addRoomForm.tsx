import  { useState, ChangeEvent, FormEvent } from "react";
import "./addRoomForm.css";
import { Room } from "../../Interfaces/interfaces";
import { addRoomAPI } from "../../APIs/propertyAPI";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LineLoader from "../Loading/LineLoader/LineLoader";
import { useTypedSelector } from "../../redux/reduxUseSelector";

const AddRoomForm :React.FC<{
  closeModal:React.Dispatch<React.SetStateAction<boolean>>
}> = (props) => {
  const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
  const [isLoading,setIsLoading] =useState(false)
  const notifySuccess = (message:string) => toast.success(message,{
    position:"top-center",
    autoClose:1000,
    hideProgressBar:true
   });
   const notifyError = (message:any) => toast.error(message,{
     position:"top-center",
     autoClose:1000,
     hideProgressBar:true
    });
  const [roomData, setRoomData] = useState<Room>({
    propertyId:'',
    roomName: "",
    typeOfRoom: "",
    rating: 0,
    location: "",
    facilities: [], 
    reviews: [], 
    price: 0,
    numOfNights: 0,
    numOfAdults: 1,
    numOfRoomLeft: 1,
    freeCancellation: false,
    isBeforePayment: false,
    images: [], 
  });

  const handleAddRoomChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRoomData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFacilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    console.log("facilities:", value);

    if (checked) {
      setRoomData((prevState) => ({
        ...prevState,
        facilities: [...prevState.facilities, value],
      }));
    } else {
      setRoomData((prevState) => ({
        ...prevState,
        facilities: prevState.facilities.filter(
          (facility) => facility !== value
        ),
      }));
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setRoomData((prevState) => ({
      ...prevState,
      [name]: value === "true" ? checked : !checked,
    }));
  };


  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
  
    const imagesArray: string[] = [];
    for (const file of files) {
      const base64String = await readFileAsDataURL(file);
      imagesArray.push(base64String);
    }
    console.log('images arara:',imagesArray);
    
    setRoomData((prevState) => ({
      ...prevState,
      images: imagesArray,
    }));
  };
  
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          const base64String = event.target.result as string;
          resolve(base64String);
        } else {
          reject(new Error("Failed to read file as data URL"));
        }
      };
      reader.onerror = (event) => {
        reject(new Error("Failed to read file as data URL"));
      };
      reader.readAsDataURL(file);
    });
  };
  
  

  const handleAddRoomSubmit = async(e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    const res = await addRoomAPI(roomData)
    if(res.data.success){
      notifySuccess(res.data.message)
      setIsLoading(false)
      props.closeModal(false)
    }else{
      notifyError(res.data.message)
    }
    console.log(roomData);
  };

  return (
    <form onSubmit={handleAddRoomSubmit} className={`form-container ${isDarkThemeOn ? 'bg-black':'bg-white'}`}>
     <div className="mb-2">
     {isLoading && <LineLoader />}
     </div>
      <ToastContainer />
      <label className="addRoomLabel">
        <span>Room Name:</span>
        <input
          className="addRoomInput"
          type="text"
          name="roomName"
          value={roomData.roomName}
          onChange={handleAddRoomChange}
          required
        />
      </label>
      <label className="addRoomLabel">
        <span>Type of Room:</span>
        <input
          className="addRoomInput"
          type="text"
          name="typeOfRoom"
          value={roomData.typeOfRoom}
          onChange={handleAddRoomChange}
          required
        />
      </label>
      {/* <label className='addRoomLabel'>
                <span>Rating:</span>
                <input className='addRoomInput' type="text" name="rating" value={roomData.rating} onChange={handleAddRoomChange} required />
            </label> */}
      <label className="addRoomLabel">
        <span>Location:</span>
        <input
          className="addRoomInput"
          type="text"
          name="location"
          value={roomData.location}
          onChange={handleAddRoomChange}
          required
        />
      </label>
      <label className="addRoomLabel">
        <span>Facilities:</span>
        <div className="">
          <div>
            <input
              className="addRoomInput"
              type="checkbox"
              name="facilities"
              value="WiFi"
              onChange={handleFacilityChange}
            />{" "}
            WiFi
            <input
              className="addRoomInput"
              type="checkbox"
              name="facilities"
              value="A/C"
              onChange={handleFacilityChange}
            />{" "}
            A/C
            <input
              className="addRoomInput"
              type="checkbox"
              name="facilities"
              value="Balcony"
              onChange={handleFacilityChange}
            />{" "}
            Balcony
          </div>
          <div>
            <input
              className="addRoomInput"
              type="checkbox"
              name="facilities"
              value="Free Food"
              onChange={handleFacilityChange}
            />{" "}
            Free Food
            <input
              className="addRoomInput"
              type="checkbox"
              name="facilities"
              value="Trucking"
              onChange={handleFacilityChange}
            />{" "}
            Trucking
          </div>
        </div>
        {/* Add more checkboxes for other facilities */}
      </label>
      {/* Add input fields or text area for reviews */}
      <label className="addRoomLabel">
        <span>Price:</span>
        <input
          className="addRoomInput"
          min={1}
          type="number"
          name="price"
          value={roomData.price}
          onChange={handleAddRoomChange}
          required
        />
      </label>
      <label className="addRoomLabel">
        <span>Number of Nights:</span>
        <input
          className="addRoomInput"
          min={1}
          type="number"
          name="numOfNights"
          value={roomData.numOfNights}
          onChange={handleAddRoomChange}
          required
        />
      </label>
      <label className="addRoomLabel">
        <span>Number of Adults:</span>
        <input
          className="addRoomInput"
          min={1}
          type="number"
          name="numOfAdults"
          value={roomData.numOfAdults}
          onChange={handleAddRoomChange}
          required
        />
      </label>
      <label className="addRoomLabel">
        <span>Number of Rooms Left:</span>
        <input
          className="addRoomInput"
          min={1}
          type="number"
          name="numOfRoomLeft"
          value={roomData.numOfRoomLeft}
          onChange={handleAddRoomChange}
          required
        />
      </label>
      <label className="addRoomLabel">
        <span>Free Cancellation:</span>
        <input
          className="addRoomInput"
          type="radio"
          name="freeCancellation"
          value="true"
          onChange={handleCheckboxChange}
          required
        />{" "}
        Yes
        <input
          className="addRoomInput"
          type="radio"
          name="freeCancellation"
          value="false"
          onChange={handleCheckboxChange}
        />{" "}
        No
      </label>
      <label className="addRoomLabel">
        <span>Is Before Payment:</span>
        <input
          className="addRoomInput"
          type="radio"
          name="isBeforePayment"
          value="true"
          onChange={handleCheckboxChange}
          required
        />{" "}
        Yes
        <input
          className="addRoomInput"
          type="radio"
          name="isBeforePayment"
          value="false"
          onChange={handleCheckboxChange}
        />{" "}
        No
      </label>

      {/* New label for images */}
      <label className="addRoomLabel">
        <span>Images:</span>
        <input
          required
          className="addRoomInput"
          type="file"
          name="images"
          onChange={handleImageChange}
          multiple
          accept="image/*"
        />
      </label>
      
      <button className="addRoomButton" type="submit">
        Add
      </button>
    </form>
  );
};

export default AddRoomForm;
