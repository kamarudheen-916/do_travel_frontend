import  { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./addRoomForm.css";
import { Room } from "../../Interfaces/interfaces";
import { addRoomAPI } from "../../APIs/propertyAPI";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LineLoader from "../Loading/LineLoader/LineLoader";
import { useTypedSelector } from "../../redux/reduxUseSelector";
import ShowImagesModal from "../../modals/RoomRelatedModals/RoomFecilites/showImagePreview";
import PlacesAutocomplete from 'react-places-autocomplete';
const AddRoomForm :React.FC<{
  closeModal:React.Dispatch<React.SetStateAction<boolean>>
}> = (props) => {
  const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
  const [isLoading,setIsLoading] =useState(false)
  const [facility,setFacility] = useState<string>('')
  const [isImagesOpen,setImagesOpen] =useState<boolean>(false)

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
    location: "",
    facilities: [], 
    reviews: [], 
    price: 0,
    numOfNights: 1,
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
      if (file.type.startsWith('image/')) { // Check if the file is an image
        const base64String = await readFileAsDataURL(file);
        imagesArray.push(base64String);
      } else {
        notifyError('Selected file is not an image');
      }
    }
    console.log('images array:', imagesArray);
  
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
      reader.onerror = () => {
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

  const handleAddFacilities =()=>{
    if(facility){
      setRoomData(prev=>({
        ...prev,
        facilities :[...prev.facilities,facility]
        
       }))
       setFacility('')
    }
  }
  const handleRemoveFacilities = (index: number) => {
    setRoomData(prev => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index)
    }));
  };
  
  useEffect(()=>{},[roomData])

  
  const handleLocationSelect = async (address: string) => {
    setRoomData(prev => ({
      ...prev,
      location: address,
    }));
    console.log('address :',address);
    
  };

  return (
  <>
    
      <form onSubmit={handleAddRoomSubmit} className={`form-container ${isDarkThemeOn ? 'bg-black':'bg-white '} overflow-y-scroll ` } style={{height:'600px'}}>
      
      <div className="mb-2">
      {isLoading && <LineLoader />}
      </div>
       <ToastContainer />
       <label className="addRoomLabel">
         <span>Room Name:</span>
         <input
           className="addRoomInput"
           placeholder="Enter Room Name.."
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
           placeholder="Enter Type of Room.."
           type="text"
           name="typeOfRoom"
           value={roomData.typeOfRoom}
           onChange={handleAddRoomChange}
           required
         />
       </label>
      <label className="addRoomLabel ">
          <span className=""> Location:</span>
          <PlacesAutocomplete
            
            value={roomData.location}
            onChange={(location) => setRoomData(prev => ({ ...prev, location }))}
            onSelect={handleLocationSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Add location..",
                    className: "addRoomInput"
                  })}
                  required
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                    const style = suggestion.active ? { backgroundColor: "#fafafa", cursor: "pointer" } : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <h1>{suggestion.description}</h1>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </label>
       <label className="addRoomLabel">
         <div>
         <span>Facilities:</span>
         </div>
         <div className="">
           <div className="">
             <input onKeyDown={(e)=>{if(e.key == 'Enter') handleAddFacilities}} onChange={(e)=>setFacility(e.target.value)} placeholder="Add Facilities.." value={facility} className="addRoomInput" type="text" name="" />
             <div onClick={handleAddFacilities} className="bg-green-800 rounded-sm text-white text-center ml-3 mt-2 cursor-pointer"> add </div>
             <div className="addRoomInput mt-2 max-w-48 flex flex-wrap">
               {
                roomData.facilities.map((item,index)=>(
                  <span className="bg-gray-400 rounded mx-1 my-1 px-1" key={index}>{item} <span onClick={()=>handleRemoveFacilities(index)} className="text-gray-500">x</span></span>
                ))
               }
             </div>
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
           className=""
           type="radio"
           name="freeCancellation"
           value="true"
           onChange={handleCheckboxChange}
           required
         />{" "}
         Yes
         <input
           className=""
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
           className=""
           type="radio"
           name="isBeforePayment"
           value="true"
           onChange={handleCheckboxChange}
           required
         />{" "}
         Yes
         <input
           className=""
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
         <div>
           <input
           required
           className="addRoomInput"
           type="file"
           name="images"
           onChange={handleImageChange}
           multiple
           accept="image/*"
         />
         
         </div>
         
       </label>
       <div className="text-end">
         {
          roomData.images.length > 0 && 
         <h1 onClick={()=>setImagesOpen(true)} className="mr-8 text-sm text-blue-500 cursor-pointer mt-1 ">Click here for previw</h1>
         }
         {
          isImagesOpen && <ShowImagesModal setRoomData={setRoomData} handleClose={()=>setImagesOpen(false)} data={roomData.images} /> 
         }
         </div>
       <button className="addRoomButton" type="submit">
         Add
       </button>
     </form>
  </>
  );
};

export default AddRoomForm;
