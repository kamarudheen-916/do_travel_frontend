import React, { useEffect, useState } from "react";
import NavBarDesk from "../../components/Home/subHomeComponents/NaveBarDesk/NavBarDesk";
import { useTypedSelector } from "../../redux/reduxUseSelector";
import { bookingData } from "../../Interfaces/interfaces";
import { fetchAllBookingsAPI } from "../../APIs/BookingAPI";
import ShowBookings from "../../components/BookingsComponents/ShowBookings";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

const Bookings: React.FC<{}> = () => {
  const Dispatch = useDispatch()
  // const navigate = useNavigate();
  const isDarkModeOn = useTypedSelector((state) => state.darkTheme.isDarkTheme);
  const [bookingsData,setBookingsData] = useState<bookingData[]|[]>([])

  useEffect(()=>{
    
    async function fetchAllBookings(){
    try {
      const Res = await fetchAllBookingsAPI()
      console.log(Res);
      if(Res?.data.success){
         setBookingsData(Res.data.bookingData)
      }
    } catch (error:any) {
      if (error.response && error.response.data) {
        if (
          error.response.status === 401 &&
          error.response.data.message === "User is blocked !!"
        ) {
          localStorage.removeItem("token");
          Dispatch({ type: "logout", payload: null });
       
        }
      }
    }
    
    }
    fetchAllBookings()
  },[])

 
  return (
    <div
      className={`flex  ${isDarkModeOn ? "bg-black text-white" : "bg-white "}`}
    >
      <div>
        <NavBarDesk />
      </div>
      <div className="flex flex-col w-full items-center h-fit">
        <div className="bg-green-800 text-white font-extrabold w-full text-center py-1 text-lg">
          <h1>Bookings</h1>
        </div>
        <div>
          {
            bookingsData.length === 0 && (
              <div className="text-center border border-green-600 placeholder my-28 py-6 px-12 rounded">
                <p className="mr-2 font-extrabold text-gray-500 text-3xl">There are no Bookings</p>
                <i className="fas fa-bell-slash text-gray-500 text-2xl"></i>
              </div>
            )
          }

         { bookingsData.map((data,index)=>(
          <div key={index}>
              <ShowBookings data={data} isDarkModeOn={isDarkModeOn}  />
          </div>
         )) }
        </div>
      </div>
    </div>
  );
};

export default Bookings;
