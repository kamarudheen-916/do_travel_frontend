import React, { useState } from 'react'
import { bookingData } from '../../Interfaces/interfaces'
import Booking_Details_Modal from '../../modals/showBookingDetailModal/BookingDetailsModal'
interface props{
    data:bookingData,
    isDarkModeOn:boolean
}
const  ShowBookings : React.FC<props>=(props)=>  {
    const [showBookingDetailModal,setShowBookingModal] =useState<boolean>(false)
    const [bookingStatus,setBookingStatus] = useState(props.data.bookingStatus)
  return (
    <>
   {showBookingDetailModal &&  <Booking_Details_Modal setBookingStatus={setBookingStatus} BookingData={props.data} handleClose={()=>setShowBookingModal(false)}/>}
    <div onClick={()=>setShowBookingModal(true)} className='flex flex-wrap gap-10 py-2 border rounded-md border-green-700 px-5 my-5'>
        <div className='flex gap-4'>
        <div>
            <img className='w-28' src={props.data.images[0]} alt="" />
        </div>
        <div>
            <h1>{props.data.roomName}</h1>
            <div className='flex gap-3 text-xs'>
            <h1 className='text-blue-500 font-bold'>{props.data.location} </h1>
            <h1 className={`font-extrabold text-sm ${bookingStatus === 'cancelled' ? 'text-red-600':'text-green-700'}`}>{bookingStatus}</h1>
            </div>
        </div>
        </div>
        <div className='flex'>
            <h1>Booking Date : </h1>
            <h1>- {props.data.checkInDate}</h1>
        </div>

    </div>
    </>
  )
}

export default ShowBookings
