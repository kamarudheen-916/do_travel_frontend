
import "./ShowRoomDetailsModal.css";

import { useTypedSelector } from "../../redux/reduxUseSelector";
import { Room, bookingData } from "../../Interfaces/interfaces";
import React from "react";
import Input from "../../components/atoms/Input/Input";


interface ModalProps {
    handleClose: () => void;
    handleBookeDeatilsOpen:()=>void;
    setBookingData:React.Dispatch<React.SetStateAction<bookingData>>
    bookingData:bookingData
    RoomData:Room|undefined
}


const BookNowModal: React.FC<ModalProps> = (props) => {
    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
    async function handlePersonalData (e:React.ChangeEvent<HTMLInputElement>){
        props.setBookingData(prev=>({
            ...prev,
            [e.target.name] :e.target.value
        }))
    }

    async function handlePaymentMethod (e:React.ChangeEvent<HTMLInputElement>){

            props.setBookingData(prev =>({
                ...prev,
                paymentIsOnline: e.target.value === 'onlinePayment' ? true :false 
            }))
    }
    async function handleBooking (e:React.ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        props.handleBookeDeatilsOpen()
        props.handleClose()
    }
       
    return (
        <div className={'roomDetailesModal '} >
            <section className={`roomDetailesModal-main ${isDarkThemeOn ? 'bg-gray-900':''}`} >
                <div className={`roomDetailesModal-header  ${isDarkThemeOn ? 'bg-gray-900':'bg-white'} `}>
                   <button className={`roomDetailesModal-Button`} onClick={props.handleClose}>X</button>
                    <h1 className={`following_heding  `}>Book Now</h1>
                </div>
                <div className="roomDetaileBody ">
                        <div className="bookingDetails flex">
                                <div className="youBookinDetails w-1/2 border border-green-700 mx-2 my-3 leading-10 py-5">
                                    <div className="font-bold text-lg underline text-center"><h1>You Booking Details</h1></div>
                                    <div className="flex justify-center">
                                        <h1>Check-in :&nbsp;</h1>
                                        <h1>{props.bookingData.checkInDate}</h1>
                                    </div>
                                    <div className="flex justify-center">
                                        <h1>Check-out :&nbsp;</h1>
                                        <h1>{props.bookingData.checkOutDate}</h1>
                                    </div>
                                    <div className="flex justify-center font-extrabold border-t-2 border-green-800">
                                        <h1>Total length of stay : {props.bookingData.numberDays} nights</h1>
                                    </div>
                                </div>
                                <div className="youPriceSummery w-1/2 border border-green-700 mx-2 my-3 leading-10 py-5">
                                    <div className="font-bold text-lg underline text-center"><h1>Your Price Details</h1></div>
                                    <div className="flex justify-center">
                                        <h1>Original Price : </h1>
                                        <h1> &nbsp;₹ {props.RoomData?.price}</h1>
                                    </div>
                                    <div className="flex justify-center">
                                        <h1>Tax : </h1>
                                        <h1> &nbsp;₹ 0</h1>
                                    </div>
                                    <div className="flex justify-center font-extrabold border-t-2 border-green-800">
                                        <h1 >Total Price : ₹ {props.bookingData.totalPrice}</h1>
                                    </div>
                                </div>
                               
                        </div>
                        <form onSubmit={(e:React.ChangeEvent<HTMLFormElement>)=>handleBooking(e)} action="">
                        <div className="userDetails">
                            
                                        <div className="p-2">
                                           
                                            <div>
                                            <Input
                                                pattern="^[A-Za-z0-9]{3,16}$"
                                                required={true}
                                                errorLabelValue={
                                                    "First name should be 3-16 characters and shouldn't include any special character!"
                                                }
                                                onChange={ handlePersonalData}
                                                type={"text"}
                                                title={"First Name"}
                                                name={"First_Name"}
                                                id={"First_Name"}
                                                placeholder={"Enter firstname "}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-2">
                                           
                                            <div>
                                            <Input
                                                pattern="^[A-Za-z0-9]{1,16}$"
                                                required={true}
                                                errorLabelValue={
                                                    "Second name should be 3-16 characters and shouldn't include any special character!"
                                                }
                                                onChange={handlePersonalData}
                                                type={"text"}
                                                title={"Second Name"}
                                                name={"Second_Name"}
                                                id={"Second_Name"}
                                                placeholder={"Enter Your Last Name"}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-2">
                                           
                                            <div>
                                            <Input
                                                    required={true}
                                                    errorLabelValue={"It should be a valid email address!"}
                                                    onChange={handlePersonalData}
                                                    type={"email"}
                                                    title={"Email"}
                                                    name={"Email"}
                                                    id={"email"}
                                                    placeholder={"Enter Your Email"}
                                                    />
                                            </div>
                                        </div>
                                        <div className="p-2">
                                           
                                            <div>
                                            <Input
                                                pattern="^[A-Za-z0-9]{3,16}$"
                                                required={true}
                                                errorLabelValue={
                                                    "First name should be 3-16 characters and shouldn't include any special character!"
                                                }
                                                onChange={ handlePersonalData}
                                                type={"text"}
                                                title={"Nationality"}
                                                name={"Nationality"}
                                                id={"Nationality"}
                                                placeholder={"Enter Nationality "}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-2">
                                           
                                            <div>
                                             <Input
                                                    required={true}
                                                    errorLabelValue={"It should be a valid mobile number!"}
                                                    onChange={handlePersonalData}
                                                    type={"number"}
                                                    title={"Mobile"}
                                                    name={"Mobile"}
                                                    id={"Mobile"}
                                                    placeholder={"Enter Your Mobile Number"}
                                                    />
                                            </div>
                                        </div>

                                </div>
                                <div className="text-center py-2">
                                    <h1 className="underline font-extrabold my-2">Select Payment method</h1>
                                    <div className="flex justify-center gap-5 p-3">
                                        <div className="flex gap-1">
                                            <input onChange={handlePaymentMethod} required type="radio"  name="paymentMethod" value={'onlinePayment'} id="onlinePayment" />
                                            <label htmlFor="onlinePayment">Online</label>
                                        </div>
                                        <div className="flex gap-1">
                                            <input onChange={handlePaymentMethod} required type="radio" name="paymentMethod" value={'afterPayment'} id="afterPayment" />
                                            <label htmlFor="afterPayment">Pay before check-in</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-2 pb-2" >
                        <button  className="bg-green-800 rounded py-2 text-white w-full hover:bg-green-700">Next</button>
                    </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default BookNowModal;
