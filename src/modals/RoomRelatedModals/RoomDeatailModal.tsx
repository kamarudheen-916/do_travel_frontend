
import "./ShowRoomDetailsModal.css";

import { useTypedSelector } from "../../redux/reduxUseSelector";
import { Room, bookingData } from "../../Interfaces/interfaces";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface ModalProps {
    handleClose: () => void;
    handleBookNowOpen:() => void;
    data:Room|undefined
    setBookingData:React.Dispatch<React.SetStateAction<bookingData>>
    bookingData:bookingData
}


const ShowRoomDetailsModal: React.FC<ModalProps> = (props) => {

    const notifyError = (message:any) => toast.error(message,{
        position:"top-center",
        autoClose:2000,
        hideProgressBar:true
       });

    const [Adults,setAdults]=useState<number|undefined>(props.data?.numOfAdults)
    const [Children,setChildren]=useState<number>(0)
    const [NumOfRooms,setNumOfRooms]=useState<number>(1)
    const [NumberOfDays,setNumberOfDays]=useState<number>(1)
    const [TotalPrice,setTotalPrice] =useState(props.data?.price)
    const [isCheckIn,setIsCheckIn] = useState<boolean>(false)
    const [isCheckOut,setIsCheckOut] = useState<boolean>(false)

    const handleSelectDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const currentDate = new Date();
        const selectedDate = new Date(value);
    
        // Validation for the first input
        if (name === 'checkInDate' && selectedDate <= currentDate) {
            notifyError('Check-in date must be greater than the current date.');
            setIsCheckIn(false)
            return;
        }
    
        // Validation for the second input
        if (name === 'checkOutDate' && selectedDate <= currentDate) {
            setIsCheckOut(false);
            notifyError('Check-out date must be greater than the current date.');
            return;
        }
    
        // Validation for ensuring the second date is greater than the first one
        if (name === 'checkOutDate' && props.bookingData.checkInDate && selectedDate <= new Date(props.bookingData.checkInDate)) {
            setIsCheckIn(false) 
            setIsCheckOut(false);
            notifyError('Check-out date must be greater than the check-in date.');
            return;
        }
            setIsCheckIn(true) 
            setIsCheckOut(true);
        props.setBookingData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    
    



    const handleChangeFoodCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setBookingData((prev)=>{
            const data = [...prev.food,e.target.value]
            return{
                ...prev,
                food :[...data]
            }
        })
    };
    
    const handleChangeFacililties = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setBookingData((prev)=>{
            const data = [...prev.facilities,e.target.value]
            return{
                ...prev,
                facilities :[...data]
            }
        })
    };

    useEffect(()=>{
        const { checkInDate, checkOutDate } = props.bookingData;
        //finding the deffrence between the two dates
        if (checkInDate !== '') {
            const startDate = new Date(checkInDate);
            const endDate = new Date(checkOutDate);
            const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
            const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
            setNumberOfDays(differenceInDays)
            props.setBookingData(prev=>({
                ...prev,
                numberDays:differenceInDays
            }))
        }
        //find the total price 
        if(props.data?.price){
            setTotalPrice(props.data?.price * NumOfRooms*NumberOfDays)
        }        
    },[NumOfRooms,props.bookingData.checkOutDate,NumberOfDays])


    

    const hadnleAddNumOfRooms = async ()=>{
        setNumOfRooms(props.data?.numOfRoomLeft && NumOfRooms < props.data?.numOfRoomLeft ? NumOfRooms + 1 : NumOfRooms)
        if(props.data?.numOfRoomLeft && NumOfRooms < props.data?.numOfRoomLeft){
            setNumOfRooms(NumOfRooms + 1)
        }else{
            setNumOfRooms(NumOfRooms)
            
               notifyError('Number of room exeeded')
            
        }
    }
    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)

    const handleBookNow = () => {
        
        const { checkInDate, checkOutDate } = props.bookingData;
        if(checkInDate !== '' && checkOutDate !== ''){
            setIsCheckIn(true)
            setIsCheckOut(true)
            props.handleBookNowOpen();
            props.handleClose();
            const price = props.data?.price ? props.data.price : 0;
            const totalPrice = TotalPrice ? TotalPrice : price;
        
            const images = props.data?.images ? [...props.data.images] : [];
        
        props.setBookingData(prev => ({
            ...prev,
            totalPrice: totalPrice,
            numberOfChilden: Children,
            numberOfRoom: NumOfRooms,
            numberOfAdults: Adults ? Adults : 2,
            roomId: props.data?._id ? props.data._id : '',
            roomType: props.data?.typeOfRoom ? props.data.typeOfRoom : '', 
            roomName: props.data?.roomName ? props.data.roomName : '',
            propertyId: props.data?.propertyId ? props.data.propertyId : '',
            images: images,
            location:props.data?.location ? props.data.location : ''
        }));
        }else{
            setIsCheckIn(false)
            setIsCheckOut(false)
            notifyError('You have to select Check-in and Check-out date.')
        }
        
    };
    
    return (
        <div className={'roomDetailesModal'}>
             <ToastContainer theme={`${isDarkThemeOn ? 'light':'dark'}`}/>
            <section className={`roomDetailesModal-main ${isDarkThemeOn ? 'bg-gray-900':''}`}>
            <div className={`roomDetailesModal-header  ${isDarkThemeOn ? 'bg-gray-900':'bg-white'} `}>
                <button className={`roomDetailesModal-Button text-green-700`} onClick={props.handleClose}>X</button>
                <h1 className={`following_heding`}>Room Details</h1>
            </div>

                <div className="roomDetaileBody">
                    <div className=" flex items-center gap-3 mx-2 my-3">
                        <img className="w-12 h-12  rounded-full" src={props.data?.images[0]} alt="" />
                        <h1>Ayikkarappadi Resort</h1>
                    </div>
                    <div className=" flex flex-wrap ">
                        {
                            props.data?.images.map((image,index)=>(
                                <img key={index} className="w-4/12" src={image} alt="" />
                            ))
                        }
                    </div>
                    <div className="text-cyan-600 cursor-pointer">
                        Click here for more photos
                    </div>
                    <div className="text-center underline">
                        <h1 className="font-bold my-3">Most popular facilities</h1>
                    </div>
                    <div className="flex justify-evenly flex-wrap text-green-600 gap-3 text-center">
                        <div><i className="fa-solid text-xl fa-wifi"></i><h1>Free wifi </h1></div>
                        <div><i className="fa-solid text-xl fa-square-parking"></i><h1>Free parking</h1></div>
                        <div><i className="fa-solid text-xl fa-utensils"></i><h1>Restaurent</h1></div>
                        <div><i className="fa-solid text-xl fa-people-roof"></i><h1>Family room</h1></div>
                        <div><i className="fa-solid text-xl fa-plane-arrival"></i><h1>Airport shuttle</h1></div>
                        <div><i className="fa-solid text-xl fa-mug-hot"></i><h1>Very good breakfast</h1></div>
                    </div>
                    <div className="text-center font-bold mt-8 underline"><label htmlFor="">Select date</label></div>

                    <div  className=" gap-5 flex-wrap flex justify-center my-3">
                        <div className="m-2">
                            <div><label htmlFor="">From : </label></div>
                        <input onChange={handleSelectDate} className={ ` ${!isCheckIn ? 'border-red-800':''} border-2 text-black border-r-4 rounded-md p-1 border-green-800 w-80 `} type="date" name="checkInDate"  />
                        </div>
                        <div className="m-2">
                        <div><label htmlFor="">To : </label></div>
                            <input onChange={handleSelectDate} className={ ` ${!isCheckOut ? 'border-red-800':''} border-2 text-black border-r-4 rounded-md p-1 border-green-800 w-80 `} type="date" name="checkOutDate"  />
                        </div>
                    </div>
                   <div className="border border-green-700 py-2 px-1 justify-around flex flex-wrap gap-10 mx-2 my-5 rounded-md ">
                <div className="flex gap-3">
                    <h1>Adults :</h1>
                    {Adults  && <button onClick={() => setAdults(Adults > 1? Adults - 1 : 1)} className="bg-green-800 text-white px-3 rounded-md font-bold text-xl">-</button>}
                    <h1>{Adults}</h1>
                    {Adults && <button onClick={() => setAdults(Adults && Adults + 1)} className="bg-green-800 text-white px-3 rounded-md font-bold text-xl">+</button>}
                </div>
                <div className="flex gap-3">
                    <h1>Children :</h1>
                    <button onClick={() => setChildren(Children >0 ? Children - 1 : 0)} className="bg-green-800 text-white px-3 rounded-md font-bold text-xl">-</button>
                    <h1>{Children == null ? 0 : Children}</h1>
                    <button onClick={() => setChildren( Children + 1)} className="bg-green-800 text-white px-3 rounded-md font-bold text-xl">+</button>
                </div>
                <div className="flex gap-3">
                    <h1>Room :</h1>
                    <button onClick={() => setNumOfRooms(NumOfRooms> 1 ? NumOfRooms - 1 :1)} className="bg-green-800 text-white px-3 rounded-md font-bold text-xl">-</button>
                    <h1>{NumOfRooms}</h1>
                    <button onClick={hadnleAddNumOfRooms} className="bg-green-800 text-white px-3 rounded-md font-bold text-xl">+</button>
                </div>
</div>

                    <div className="text-center font-bold underline"><label htmlFor="">Food  </label></div>
                    <div className="flex flex-wrap justify-around py-2 px-1 mx-2 my-2 rounded-md border border-green-800">
                        <div>
                            <label htmlFor="">Breakfast : </label>
                            <input onChange={handleChangeFoodCategory} type="checkbox" value={'Breakfast'} name="Breakfast" id="" />
                        </div>
                        <div>
                            <label htmlFor="">Lunch : </label>
                            <input onChange={handleChangeFoodCategory} type="checkbox"  value={'Lunch'} name="Lunch" id="" />
                        </div>
                        <div>
                            <label htmlFor="">Dinner : </label>
                            <input onChange={handleChangeFoodCategory} type="checkbox" value={'Dinner'} name="Dinner" id="" />
                        </div>
                    </div>
                    <div className="text-center font-bold underline"><label htmlFor="">Fecilities  </label></div>
                    <div className="flex flex-wrap justify-around gap-2 py-2 px-1 mx-2 my-2 rounded-md border border-green-800">
                        {props.data?.facilities.map((item,index)=>(
                            <div key={index}>
                            <label htmlFor="">{item} : </label>
                            <input onChange={handleChangeFacililties} type="checkbox" value={item} name={item} id="" />
                        </div>
                        ))}
                        
                    </div>
                    <div className="flex flex-wrap justify-evenly rounded-md border border-green-800 mx-2 my-10 py-2 px-2">
                        <div className="flex gap-1">
                            <h1>Availabilty :</h1>
                            <h1 className={`${isDarkThemeOn ? 'text-yellow-400' : 'text-yellow-700'}`}>{props.data?.numOfRoomLeft} Rooms are available</h1>
                        </div>
                       { props.data?.isBeforePayment ? 
                       <div className="flex gap-1">
                            <h1>Payment :</h1>
                            <h1 className={`${isDarkThemeOn ? 'text-yellow-400' : 'text-yellow-700'}`}>You can pay at the property</h1>
                        </div>
                        :
                        <div className="flex gap-1">
                            <h1>Payment :</h1>
                            <h1 className={`${isDarkThemeOn ? 'text-yellow-400' : 'text-yellow-700'}`}>Pay Before Checkin</h1>
                       </div>
                    }
                        {props.data?.freeCancellation ?<div className="flex gap-1">
                            <h1>Cancellation : </h1>
                            <h1 className={`${isDarkThemeOn ? 'text-yellow-400' : 'text-yellow-700'} `}>Free</h1>
                        </div> :
                        <div className="flex gap-1">
                            <h1>Cancellation : </h1>
                            <h1 className={`${isDarkThemeOn ? 'text-yellow-400' : 'text-yellow-700'}`}>You may need pay some mony</h1>
                         </div>}
                        <div className={`flex gap-1 items-center font-extrabold text-lg  ${isDarkThemeOn ? 'text-yellow-400' : 'text-yellow-700'}`}>
                            <h1>Total Price :</h1>
                            <h1 className="">₹ {TotalPrice}/-</h1>
                        </div>
                    </div>
                    <div className="px-2 pb-2" >
                        <button onClick={handleBookNow} className="bg-green-800 rounded py-2 text-white w-full hover:bg-green-700">Book Now</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShowRoomDetailsModal;
