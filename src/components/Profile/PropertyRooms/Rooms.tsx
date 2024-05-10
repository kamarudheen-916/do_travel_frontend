import { useState } from 'react';
import { Room } from "../../../Interfaces/interfaces";
import "./Rooms.css";

const Rooms: React.FC<{
  roomData: Room[] | undefined
}> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  const [activeButton, setActiveButton] = useState(1); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.roomData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setActiveButton(pageNumber); // Set the active button when paginating
  };

  return (
    <>
      {currentItems?.map((room, index) => (
        <div key={index} className="mt-4 flex roomsMainDiv">
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
