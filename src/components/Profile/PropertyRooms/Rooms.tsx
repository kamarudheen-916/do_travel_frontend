import { useState } from 'react';
import { Room, bookingData } from "../../../Interfaces/interfaces";
import "./Rooms.css";
import ShowRoomDetailsModal from '../../../modals/showRoomDeatilsModal/RoomDeatailModal';
import BookNowModal from '../../../modals/showRoomDeatilsModal/BookNowModal';
import BookingDetailsModal from '../../../modals/showRoomDeatilsModal/BookingDetailModal';



const Rooms: React.FC<{
  roomData: Room[] | undefined
}> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  const [activeButton, setActiveButton] = useState(1); 
  const [roomDetailsModalOpen,setRoomDetailsModalOpen] =useState<boolean>(false)
  const [BookRoomModalOpen,setBookRoomModalOpen] =useState<boolean>(false)
  const [BookingDetailsModalOpen,setBookingDetailsModalOpen] = useState<boolean>(false)
  const [roomData,setRoomData] = useState<Room>()
  const [bookingData,setBookingData] =useState<bookingData>({
    roomId:'',
    roomName:'',
    roomType:'',
    propertyName:'',
    propertyProfile:'',
    propertyId:'',
    bookingUserId:'',
    First_Name:'',
    Second_Name:'',
    Email:'',
    Nationality:'',
    Mobile:0,
    numberOfAdults:0,
    numberOfChilden:0,
    isCancellationfree:false,
    isBeforePayment:false,
    totalPrice:0,
    numberDays:0,
    food:[],
    facilities:[],
    checkInDate:'',
    checkOutDate:'',
    numberOfRoom:0,
    paymentIsOnline:true,
    images:[],
    bookingStatus:'',
    location:''
  })


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.roomData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setActiveButton(pageNumber); // Set the active button when paginating
  };

  const handleBook_NowOpen = (room:Room)=>{
    setRoomDetailsModalOpen(true)
    setRoomData(room)
  }

  return (
    <>
       {roomDetailsModalOpen &&  <ShowRoomDetailsModal  bookingData={bookingData} setBookingData={setBookingData} data={roomData}  handleBookNowOpen={()=>setBookRoomModalOpen(true)} handleClose={()=>setRoomDetailsModalOpen(false)}  /> }
       {BookRoomModalOpen && <BookNowModal bookingData={bookingData} setBookingData={setBookingData} RoomData={roomData} handleClose={()=>setBookRoomModalOpen(false)} handleBookeDeatilsOpen={()=>setBookingDetailsModalOpen(true)} />}
       {BookingDetailsModalOpen && <BookingDetailsModal BookingData={bookingData} handleClose={()=>setBookingDetailsModalOpen(false)}/>}
      {currentItems?.map((room, index) => (
        <div onClick={()=>handleBook_NowOpen(room)} key={index} className="mt-4 flex roomsMainDiv">
          <div>
          </div>
          <div className="roomImg w-60 m-2 rounded">
            <img
              src={room.images[0]}
              alt=""
            />
          </div>
          <div className="roomDetails flex">
            <div className="firstPart">
              <div className="">
                <h1 className="roomName  ">{room.roomName}</h1>
              </div>
              <div className="ratingDiv text-yellow-500">
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>
              <div className="text-blue-500">{room.location}</div>
              <div>
                <h1 className="font-bold">{room.typeOfRoom}</h1>
              </div>
              <div className="cancellation">
                <div className="">
                  {room.freeCancellation && <h1>Free Cancellation</h1>}
                </div>
                <div className="">
                  {room.isBeforePayment && <h1>
                    No prepayment needed <span>- pay at the property</span>
                  </h1>}
                </div>
              </div>
              <div className="text-red-700">
                <h1>Only <span>{room.numOfRoomLeft}</span> room left at this price on our site</h1>
              </div>
            </div>
            <div className="secondPart flex flex-col justify-between">
              <div className="reviewDiv">
                <div className="review">
                  <h1>Very good</h1>
                  <span className="reviewsSpan"><span>{room.reviews?.length}</span> reviews</span>
                </div>
                <div className="reviewIcon">
                  <h1 className="">{room.rating}</h1>
                </div>
              </div>
              <div>
                <div className="numberOfdays">
                  <h1><span>{room.numOfNights}</span>night, <span>{room.numOfAdults}</span> adults</h1>
                </div>
                <div className="roomPrice">
                  <span>₹4,320</span>
                  <h1>₹{room.price}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Pagination controls */}
      <div className="pagination text-center my-2">
        {/* <button 
          className={`pagination-button bg-green-800 text-white px-3 rounded-md ${activeButton === 1 ? 'active' : ''}`}
          onClick={() => paginate(1)} 
          disabled={currentPage === 1}
        >
          Previous
        </button> */}
        <div>
          {props.roomData &&
            Array.from({ length: Math.ceil((props.roomData.length || 0) / itemsPerPage) }).map((_, index) => (
              <button 
                key={index}
                className={`pagination-button bg-green-800 text-white px-3 rounded-md ${activeButton === index + 1 ? 'bg-green-600' : ''}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
        </div>
        {/* <button 
          className={`pagination-button bg-green-800 text-white px-3 rounded-md ${activeButton === Math.ceil((props.roomData?.length || 0) / itemsPerPage) ? 'active' : ''}`}
          onClick={() => paginate(Math.ceil((props.roomData?.length || 0) / itemsPerPage))} 
          disabled={currentPage === Math.ceil((props.roomData?.length || 0) / itemsPerPage)}
        >
          Next
        </button> */}
      </div>
    </>
  );
};

export default Rooms;
