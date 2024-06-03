import { bookingData } from "../Interfaces/interfaces";
import axiosInstance from "../services/axios";

export const confirmBookingAPI = async (bookingData:bookingData)=>{
    try {
        return await axiosInstance.post('/user/confirmBooking',{bookingData})
    } catch (error) {
        console.log('confirm booking api error :',error);
          throw error;
    }
}

export const fetchAllBookingsAPI = async ()=>{
    try {
        return await axiosInstance.get(`/user/fetchAllBookings`)
    } catch (error) {
        console.log('confirm booking api error :',error);
          throw error;
    }
}

export const cancelBookingAPI = async (BookingId:any)=>{
    try {
        return await axiosInstance.put(`/user/cancelBookings?bookingId=${BookingId}`)
    } catch (error) {
        console.log('confirm booking api error :',error);
          throw error;
    }
}

export const onlineBookingAPI = async (bookingData:any,roomPrice:any)=>{
    try {
        return await axiosInstance.post(`/user/onlinePayment`,{bookingData:bookingData,roomPrice})
    } catch (error) {
        console.log('confirm booking api error :',error);
          throw error;
    }
}

export const checkRoomAvailabilityAPI = async (roomId:string|undefined,checkInDate:string|undefined,checkOutDate:string|undefined)=>{
    try {
        console.log('roomId:',roomId,'checkinDate',checkInDate,'checkOutdate',checkOutDate);
        
        return await axiosInstance.get(`/user/checkRoomAvailability`,{params:{roomId,checkInDate,checkOutDate}})
    } catch (error) {
        console.log('checkRoomAvailabilityAPI error :',error);
        throw error
    }
}