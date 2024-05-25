import React, { useEffect, useState } from 'react'
import { bookingData } from '../../../Interfaces/interfaces'
import { fetchAllBookingDataAPI } from '../../../API_admin/adminAPI';
import ShowImagesModal from '../../../modals/adminModals/imagePreviewModal/showImagePreview';

const BookingTable:React.FC=()=> {
  const [rows,setRows] =useState<bookingData[]>()
  const [Profit,setProfit] = useState<number>(0)
  const [imagesPreview,setImagesPreview] = useState<string[]>()
  const [isImagePreviewModalOpen,setImageModalOpen] = useState<boolean>(false)
  const columns = [
    { label: 'Booker Name ', key: 'firstName' },
    { label: 'Property Name', key: 'PropertyName' },
    { label: 'PropertyProfile ', key: 'PropertyProfile' },
    { label: 'Booker Email', key:'email'},
    { label: 'Booked Date', key:'BookedDate'},
    { label: 'Booking Date', key:'BookingDate'},
    { label: 'Payment', key:'Payment'},
    { label: 'Amount', key:'Amount'},
    { label: 'Room Image', key: 'Room Image' },
    // { label: 'Edit',key:'edit'},
    { label: 'Status',key:'isBlocked'},
  ];

  const showImagePreview = (images:string[])=>{
    setImagesPreview(images)
    setImageModalOpen(true)

  }
  async function fetchAllUserData (){
    const res = await fetchAllBookingDataAPI()
    if(res?.data.success){
      console.log(res.data);
      setRows(res.data.bookings)
    }
  }

  useEffect(()=>{
    fetchAllUserData()
  },[])

  useEffect(() => {
    if (rows && rows.length > 0) {
      let profit = rows.reduce((tot, item) => item.totalPrice + tot, 0);
      profit = (profit * 10) / 100;
      setProfit(profit);
    }
  }, [rows]);


  const [currentPage, setCurrentPage] = useState(0);
//   const [editUserId, setEditUserId] = useState<string>();
  const rowsPerPage = 3;

  const totalPages = Math.ceil((rows?.length || 0) / rowsPerPage);

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = rows?.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };




  return (
    <div>
      <div>
       { isImagePreviewModalOpen && <ShowImagesModal data={imagesPreview} handleClose={()=>setImageModalOpen(false)}  />}
      </div>
        <table className='w-full text-center mt-3'>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows?.map((row, rowIndex) => (
            <tr key={rowIndex} className='border border-green-600'>
              <td>{row.First_Name+row.Second_Name}</td>
              <td>{row.propertyName}</td>
              <td className='text-center py-2'>
                {row.propertyProfile  ?( <img className='max-w-24 max-h-24 m-auto' src={row.propertyProfile} alt="" /> ):( <i className='fa-solid fa-home text-6xl'></i>)}
              </td>
              
              <td>{row.Email}</td>
              <td>{row.createdAt.toString().split('T')[0]}</td>
              <td>{row.checkInDate}</td>
              <td>{row.paymentIsOnline ? <span className='text-green-800'>Completed</span>:<span className='text-yellow-500'>Pending</span>}</td>
              <td>₹ {row.totalPrice}/-</td>
              <td onClick={()=>showImagePreview(row.images)} className='text-center py-2'>
                {row.images[0]  ?( <img className='max-w-24 max-h-24 m-auto' src={row.images[0]} alt="" /> ):( <i className='fa-solid fa-home text-6xl'></i>)}
              </td>
              {/* <td><i onClick={() => handleEditModalClick(row._id)} className='fa-solid fa-pencil cursor-pointer'></i></td> */}
              <td  className={`${row.bookingStatus === 'confirmed' ? 'text-green-500':'text-yellow-600'}`}>{row.bookingStatus}</td>
            </tr>
          ))}
        </tbody>
        </table>
        <div className='pagination text-center'>
        <button className='bg-green-800 px-3 py-1 my-3 mx-3 rounded' onClick={handlePrevPage} disabled={currentPage === 0}>
          Prev
        </button>
        <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
        <button className='bg-green-800 px-3 py-1 my-3 mx-3 rounded' onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
      <div className='flex justify-center my-16 '>
        <div className='border px-48 py-16 text-3xl text-green-400'>
          <h1 >Porfit : <span>₹ {Profit}/-</span></h1>
        </div>
      </div>
    </div>
  )
}

export default BookingTable
