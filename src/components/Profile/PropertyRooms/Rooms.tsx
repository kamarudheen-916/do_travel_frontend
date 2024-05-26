import { SetStateAction, useEffect, useState } from 'react';
import { Room, bookingData } from "../../../Interfaces/interfaces";
import "./Rooms.css";
import ShowRoomDetailsModal from '../../../modals/RoomRelatedModals/RoomDeatailModal';
import BookNowModal from '../../../modals/RoomRelatedModals/BookNowModal';
import BookingDetailsModal from '../../../modals/RoomRelatedModals/BookingDetailModal';
import RoomEdit from '../../../modals/RoomRelatedModals/RoomEdit';
import { deleteRoomAPI } from '../../../APIs/propertyAPI';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import RatingModal from '../../../modals/RoomRelatedModals/RoomRatingModal/RatingModal';



const Rooms: React.FC<{
  roomData: Room[]|undefined
  setRoomEditModalOpen:React.Dispatch<SetStateAction<boolean>>
  RoomEditModlaOpen:boolean
  setRoomData:React.Dispatch<SetStateAction<Room[]|undefined>>
}> = (props) => {
  const userType = localStorage.getItem('userType')
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  const [activeButton, setActiveButton] = useState(1); 
  const [roomDetailsModalOpen,setRoomDetailsModalOpen] =useState<boolean>(false)
  const [BookRoomModalOpen,setBookRoomModalOpen] =useState<boolean>(false)
  const [BookingDetailsModalOpen,setBookingDetailsModalOpen] = useState<boolean>(false)
  // const [RoomEditModalOpen,setRoomEditModalOpen] = useState<boolean>(false)
  const [roomData,setRoomData] = useState<Room>()
  const [ratingModalOpen, setRatingModalOpen] = useState<boolean>(false); 
  const [roomId,setRoomId] = useState<any>()
 
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
    location:'',
   
  })

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

    useEffect(()=>{},[props.roomData,BookingDetailsModalOpen])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.roomData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setActiveButton(pageNumber); // Set the active button when paginating
  };

  const handleBook_NowOpen = (room:Room)=>{
    if(userType === 'property'){
      props.setRoomEditModalOpen(true)
    }else{
      setRoomDetailsModalOpen(true)
    }
    setRoomData(room)
  }

 const handleDeleteRoom = async (roomId:any)=>{
    try {

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",      
        confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
        if (result.isConfirmed) {
          const res = await deleteRoomAPI(roomId)
          if(res.data.success){         
            if(res.data.rooms){
              props.setRoomData(res.data.rooms)
            }
            notifySuccess(res.data.message)
          }else{
            notifyError(res.data.message)
          }
        }
        });
    } catch (error) {
      console.log('delete room error :',error);
      
    }
 }


  return (
    <>
      <ToastContainer />
      <RatingModal roomId={roomId} handleClose={()=>setRatingModalOpen(false)} isOpen={ratingModalOpen} />
       <div>
            {roomDetailsModalOpen &&  <ShowRoomDetailsModal  bookingData={bookingData} setBookingData={setBookingData} data={roomData}  handleBookNowOpen={()=>setBookRoomModalOpen(true)} handleClose={()=>setRoomDetailsModalOpen(false)}  /> }
            {BookRoomModalOpen && <BookNowModal bookingData={bookingData} setBookingData={setBookingData} RoomData={roomData} handleClose={()=>setBookRoomModalOpen(false)} handleBookeDeatilsOpen={()=>setBookingDetailsModalOpen(true)} />}
            {BookingDetailsModalOpen && <BookingDetailsModal RoomData={roomData} BookingData={bookingData} handleClose={()=>setBookingDetailsModalOpen(false)}/>}
       </div>
       <div>
            {props.RoomEditModlaOpen &&  <RoomEdit RoomData={roomData} handleClose={()=>props.setRoomEditModalOpen(false)} />}
       </div>
      {currentItems?.map((room, index) => (
        <div key={index}>
          {room.numOfRoomLeft >0 &&
            <div >
            <div   className="mt-14 flex roomsMainDiv">
            <div>
            </div>
            <div className="roomImg w-60  m-2 rounded">
              <img
                onClick={()=>handleBook_NowOpen(room)}
                className='h-52'
                src={room.images[0]}
                alt=""
              />
            </div>
            <div className="roomDetails flex">
              <div className="firstPart">
                <div className="">
                  <h1 className="roomName  ">{room.roomName}</h1>
                </div>
                <div onClick={() => {setRatingModalOpen(true),setRoomId(room._id)}} className="ratingDiv text-yellow-500 cursor-pointer">
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
                    {/* <h1 className="">{room.rating}</h1> */}
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
          <div>
              <button onClick={()=>handleDeleteRoom(room._id)} className='bg-green-800 rounded px-2 py-1 w-full'>Delete</button>
            </div>
            </div>
          }
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
