
import "./ShowRoomDetailsModal.css";

import { useTypedSelector } from "../../redux/reduxUseSelector";
import Swal from 'sweetalert2'
import { Room, bookingData } from "../../Interfaces/interfaces";
import { checkRoomAvailabilityAPI, confirmBookingAPI } from "../../APIs/BookingAPI";
import {loadStripe} from '@stripe/stripe-js'
import { onlineBookingAPI } from "../../APIs/BookingAPI";
import { ToastContainer, toast } from "react-toastify";

interface ModalProps {
    handleClose: () => void;
    BookingData : bookingData
    RoomData : Room|undefined
}



const BookingDetailsModal: React.FC<ModalProps> = (props) => {

    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
    const notifyError = (message:any) => toast.error(message,{
        position:"top-center",
        autoClose:2000,
        hideProgressBar:true
       });

    async function handleConfimBooking (){


        try {

            const res = await checkRoomAvailabilityAPI(props.BookingData?.roomId,props.BookingData.checkInDate,props.BookingData.checkOutDate)
            console.log(res.data);
            if(!res.data.success){
                notifyError(res.data.message)
                return;
            }else if(props.BookingData.paymentIsOnline){
                    const Publishable_key =  import.meta.env.VITE_STRIPE_Publishable_key 
                    const stripe = await loadStripe(Publishable_key)
                    const paymentRes = await onlineBookingAPI(props.BookingData,props.RoomData?.price)
                    if(paymentRes?.data.success){
                        const sessionId = paymentRes.data.session.id;
                        await confirmBookingAPI(props.BookingData)
                       if(stripe){
                        const { error } = await stripe?.redirectToCheckout({ sessionId });
                        if (error) {
                            console.error("Stripe checkout error", error);
                        }
                       }
                    }   else{
                        console.error("Payment session creation failed", paymentRes?.data.message);
                        Swal.fire({
                            icon: "error",
                            title: "Oops..!",
                            text: paymentRes?.data.message,
                            didClose:props.handleClose
                          });
                    }
                }else{
                    
                    const res =await confirmBookingAPI(props.BookingData)
                    console.log('confirm booking response :',res);
                    
                    if(res?.data.success){
                        Swal.fire({
                            icon: "success",
                            title: "Congratulations..",
                            text: "Your Booking is Confirmed.",
                            didClose:props.handleClose
                          });
                    }else{
                        Swal.fire({
                            icon: "error",
                            title: "Oops..!",
                            text:res?.data.message || "Your Booking is not Confirmed..!",
                            didClose:props.handleClose
                          });
                    }
                }
            
           
        } catch (error:any) {
            console.log('uploading (confirming) booking deltails error :',error);
            Swal.fire({
                icon: "error",
                title: "Oops..!",
                text:error.response.data.message || "****!",
                didClose:props.handleClose
              });
            
        }
       
    }
    return (
        <div className={'roomDetailesModal '} >
             <ToastContainer theme={`${isDarkThemeOn ? 'light':'dark'}`}/>
            
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
                            <h1>Payment status &nbsp;:&nbsp;{props.BookingData.paymentIsOnline ? `Payment Successfull` : `Pending (Before Check-in)`}  </h1>
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
                                <h1>Number of Rooms &nbsp;:&nbsp; {props.BookingData.numberOfRoom}</h1>
                                <h1>Length of Days &nbsp;:&nbsp; {props.BookingData.numberDays}</h1>
                            </div>
                        </div>
                        
                   </div>
                   
                   <div className="px-2 pb-2 my-4" >
                        <button onClick={handleConfimBooking} className="bg-green-800 rounded py-2 text-white w-full hover:bg-green-700">Confirm Booking</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BookingDetailsModal;
