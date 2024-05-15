import { bookingData } from "../Interfaces/interfaces";
import axiosInstance from "../services/axios";

export const confirmBookingAPI = async (bookingData:bookingData)=>{
    try {
        return await axiosInstance.post('/user/confirmBooking',{bookingData})
    } catch (error) {
        console.log('confirm booking api error :',error);
        
    }
}

export const fetchAllBookingsAPI = async ()=>{
    try {
        return await axiosInstance.get(`/user/fetchAllBookings`)
    } catch (error) {
        console.log('confirm booking api error :',error);
        
    }
}

export const cancelBookingAPI = async (BookingId:any)=>{
    try {
        return await axiosInstance.put(`/user/cancelBookings?bookingId=${BookingId}`)
    } catch (error) {
        console.log('confirm booking api error :',error);
        
    }
}