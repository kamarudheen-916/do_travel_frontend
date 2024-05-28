
// import "./ShowRoomDetailsModal.css";

import { useTypedSelector } from "../../redux/reduxUseSelector";
import Swal from 'sweetalert2'
import { bookingData } from "../../Interfaces/interfaces";
import { cancelBookingAPI } from "../../APIs/BookingAPI";
// import { useState } from "react";
interface ModalProps {
    handleClose: () => void;
    BookingData : bookingData
    setBookingStatus:React.Dispatch<React.SetStateAction<string>>
}

const Booking_Details_Modal: React.FC<ModalProps> = (props) => {

    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
    async function handleCancellBooking (){
        try {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",      
                confirmButtonText: "Yes, cancel it!"
                }).then(async(result) => {
                if (result.isConfirmed) {
                    const res = await cancelBookingAPI(props.BookingData._id)
                    if(res?.data.success){
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Your file has been deleted.",
                            icon: "success"
                            });
                            props.setBookingStatus('cancelled')
                    }else{
                        Swal.fire({
                            icon: "error",
                            title: "Oops..!",
                            text: "Your Booking is not cancelled..!",
                            didClose:props.handleClose
                          });
                        }
                }
                });

        } catch (error) {
            console.log('uploading (confirming) booking deltails error :',error);
        }
       
    }
    return (
        <div className={'roomDetailesModal '} >
    
            <section className={`roomDetailesModal-main ${isDarkThemeOn ? 'bg-gray-900':''}`} >
                <div className={`roomDetailesModal-header  ${isDarkThemeOn ? 'bg-gray-900':'bg-white'} `}>
                   <button className={`roomDetailesModal-Button`} onClick={props.handleClose}>X</button>
                    <h1 className={`following_heding font-extrabold text-lg `}>Your Booking Deatails</h1>
                </div>
                <div className="roomDetaileBody ">
                <div className=" flex items-center gap-3 mx-2 my-3">
                        <img className="w-12 h-12  rounded-full" src="https://res.cloudinary.com/djfsuoryg/image/upload/v1714489236/rq3tz944h8kvwiyfhpw2.jpg" alt="" />
                        <h1>Ayikkarappadi Resort</h1>
                    </div>
                    <div className=" flex flex-wrap ">
                        {
                            props.BookingData.images.map((image,index)=>(
                                <img key={index} className="w-1/3" src={image} alt="" />
                            ))
                        }
                    </div>
                    {/* <div className="text-cyan-600 cursor-pointer">
                        Click here for more photos
                    </div>  */}
                   <div className="flex justify-evenly flex-wrap my-9" >

                        <div className="RoomDetails ">
                                    <div className=" font-extrabold text-lg underline"><h1>Room Details</h1></div>
                                <div className="flex ">
                                    <h1>Type of Your Room &nbsp;:&nbsp;  {props.BookingData.roomType}</h1>
                                </div>
                                <div className="flex flex-wrap gap-2  ">
                                    <h1>Facilities &nbsp;:&nbsp;</h1>
                                    {
                                        props.BookingData.facilities.map((facil,index)=>(
                                            <h1 key={index}>{facil}</h1>
                                        ))
                                    }
                                   
                                </div>
                                <div className="flex gap-5 ">
                                    <h1>Food &nbsp;:&nbsp;</h1>
                                    {
                                        props.BookingData.food.map((type,index)=>(
                                            <h1 key={index}>{type}</h1>
                                        ))
                                    }
                                    
                                </div>
                                <div className="">
                                    <h1>Check in Time &nbsp;:&nbsp; {props.BookingData.checkInDate} - 1.00 PM</h1>
                                    <h1>Check out Time &nbsp;:&nbsp;{props.BookingData.checkOutDate} -  12.30 PM</h1>
                                </div>
                                <div className="paymentDetails ">
                            <h1>Payment status &nbsp;:&nbsp; Pending (Before Check-in)</h1>
                            <h1>Total Price &nbsp;:&nbsp; ₹ {props.BookingData.totalPrice}/-</h1>
                        </div>
                        </div>
                        <div className="PersonalDetails">
                                <div className=" font-extrabold text-lg underline "><h1>Personal Details</h1></div>
                            <div className="">
                                <h1>Guest Name &nbsp;:&nbsp; {props.BookingData.First_Name +' ' +props.BookingData.Second_Name}</h1>
                                <h1>Email &nbsp;:&nbsp;{props.BookingData.Email}</h1>
                                <h1>Nationality &nbsp;:&nbsp; {props.BookingData.Nationality}</h1>
                                <h1>Mobile Number &nbsp;:&nbsp; {props.BookingData.Mobile}</h1>


                            </div>
                            <div className="">
                                <h1>Number of Adults &nbsp;:&nbsp; {props.BookingData.numberOfAdults}</h1>
                                <h1>Number of Children &nbsp;:&nbsp; {props.BookingData.numberOfChilden}</h1>
                                <h1>Length of Days &nbsp;:&nbsp; {props.BookingData.numberDays}</h1>
                            </div>
                        </div>
                        
                   </div>
                   
                   <div className="px-2 pb-2 my-4" >
                        <button 
                        onClick={handleCancellBooking} 
                        className="bg-green-800 rounded py-2 text-white w-full hover:bg-green-700">Cancel Booking</button>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Booking_Details_Modal;
