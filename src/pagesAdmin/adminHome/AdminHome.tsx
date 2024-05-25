import React, { useEffect, useState } from 'react'
import AdminNav from '../../componentsAdmin/AdminNav/AdminNav'
import Chart from '../../componentsAdmin/chart/Chart'
import { fetchDashBoardCountAPI, fetchDashBoardGraphDataAPI } from '../../API_admin/adminAPI'
import './adminHome.css'

const  AdminHome:React.FC=() =>{
  const [userCount,setUserCount] = useState<number>(0)
  const [properyCount,setPropertyCount] = useState<number>(0)
  const [BookingCount,setBookingCount] = useState<number>(0)
  const [isDateDivVisible, setIsDateDivVisible] = useState(false);
  const [DateDivType,setDateDivType] = useState<string>('')
  const [userDateType,setUsersDateType] = useState<string>('all')
  const [propertiesDateType,setpropertiesDateType] = useState<string>('all')
  const [BookingsDateType,setBookingsDateType] = useState<string>('all')
  const [userData,setUserData] = useState()
  const [propertyData,setPropertyData] = useState()
  const [bookingData,setBookingData] = useState()

  const toggleDateDiv = (type:string) => {
    setIsDateDivVisible(!isDateDivVisible);
    setDateDivType(type)
   
  };


  
  async function fetchDashBoardGraphData(DataType:string,DateType:string){
    console.log(DataType,DateType);
    
    if(DataType == 'users'){
      setUsersDateType(DateType)
     const  res = await fetchDashBoardGraphDataAPI(DataType,DateType)
     if(res?.data){
      setUserData(res?.data.data)
      console.log(userData);
      
     }
    }else if(DataType === 'Properties'){
      setpropertiesDateType(DateType)
      const  res = await fetchDashBoardGraphDataAPI(DataType,DateType)
      if(res?.data){
       setPropertyData(res.data.data)

       
      }
    }else if(DataType === 'bookings'){
      setBookingsDateType(DateType)
      const  res = await fetchDashBoardGraphDataAPI(DataType,DateType)
      if(res?.data){
       setBookingData(res.data.data)
      }
      console.log('bookingData',bookingData);
      
    }
    setIsDateDivVisible(!isDateDivVisible);

  }

  useEffect(()=>{
    async function fetchDashBoardCount(){
    const res = await fetchDashBoardCountAPI()
      if(res?.data.success){
        setUserCount(res.data.numberUsers)
        setPropertyCount(res.data.numberProperties)
        setBookingCount(res.data.numberBooking ? res.data.numberBooking : 0)
      }
    }
    fetchDashBoardCount()
     fetchDashBoardGraphData('users','day')
     fetchDashBoardGraphData('Properties','day')
     fetchDashBoardGraphData('bookings','day')
  },[])
  return (
    <div className='bg-slate-800 text-white'>
       <div>
         <AdminNav />
       </div>
       <div className='h-dvh overflow-y-auto'>
      <div className='px-2 py-3'>
        <div>
          <button onClick={()=>toggleDateDiv('users')}  className='selectDateButton bg-green-700 hover:bg-green-600 w-full rounded'>{userDateType}</button>
          {isDateDivVisible &&  DateDivType === 'users' &&(
            <div className={`selectDateDiv w-full text-center mt-2 ${isDateDivVisible ? 'show' : ''}`}>
              <h1 onClick={()=>fetchDashBoardGraphData('users','day')} className='cursor-pointer hover:bg-transparent hover:bg-green-900 border border-green-700 rounded'>Day</h1>
              <h1 onClick={()=>fetchDashBoardGraphData('users','month')} className='cursor-pointer hover:bg-transparent hover:bg-green-900 border border-green-700 rounded'>Month</h1>
              <h1 onClick={()=>fetchDashBoardGraphData('users','all')} className='cursor-pointer hover:bg-transparent hover:bg-green-900 border border-green-700 rounded'>all</h1>
            </div>
          )}

        </div>
      <div className='flex items-center justify-center'>
            <div className='p-10 w-1/2'>
              <Chart data={userData}/>
            </div>
             <div className='border border-green-600 text-green-700 h-fit px-4  py-24 rounded-lg font-extrabold text-5xl'>
               <h1>Number of users : <span>{userCount}</span></h1>
             </div>
          </div>
      </div>
        <div>
        <div>
          <button onClick={()=>toggleDateDiv('Properties')}  className='selectDateButton bg-green-700 hover:bg-green-600 w-full rounded'>{propertiesDateType}</button>
          {isDateDivVisible && DateDivType === 'Properties' && (
            <div className={`selectDateDiv w-full text-center mt-2 ${isDateDivVisible ? 'show' : ''}`}>
              <h1 onClick={()=>fetchDashBoardGraphData('Properties','day')} className='cursor-pointer hover:bg-transparent hover:bg-green-900 border border-green-700 rounded'>Day</h1>
              <h1 onClick={()=>fetchDashBoardGraphData('Properties','month')} className='cursor-pointer hover:bg-transparent hover:bg-green-900 border border-green-700 rounded'>Month</h1>
              <h1 onClick={()=>fetchDashBoardGraphData('Properties','all')} className='cursor-pointer hover:bg-transparent hover:bg-green-900 border border-green-700 rounded'>all</h1>
            </div>
          )}

        </div>
        <div className='flex items-center justify-center'>
            <div className='p-10 w-1/2'>
              <Chart data={propertyData}/>
            </div>
             <div className='border border-green-600 text-green-700 h-fit px-4  py-24 rounded-lg font-extrabold text-5xl'>
               <h1>Number of Properties : <span>{properyCount}</span></h1>
             </div>
          </div>
        </div>
       <div className=' my-2'>
       <div>
          <button onClick={()=>toggleDateDiv('Bookings')}  className='selectDateButton bg-green-700 hover:bg-green-600 w-full rounded'>{BookingsDateType}</button>
          {isDateDivVisible && DateDivType === 'Bookings' && (
            <div className={`selectDateDiv w-full text-center mt-2 ${isDateDivVisible ? 'show' : ''}`}>
              <h1 onClick={()=>fetchDashBoardGraphData('bookings','day')} className='cursor-pointer hover:bg-transparent hover:bg-green-900 border border-green-700 rounded'>Day</h1>
              <h1 onClick={()=>fetchDashBoardGraphData('bookings','month')} className='cursor-pointer hover:bg-transparent hover:bg-green-900 border border-green-700 rounded'>Month</h1>
              <h1 onClick={()=>fetchDashBoardGraphData('bookings','all')} className='cursor-pointer hover:bg-transparent hover:bg-green-900 border border-green-700 rounded'>all</h1>
            </div>
          )}

        </div>
       <div className='flex items-center justify-center'>
            <div className='p-10 w-1/2'>
              <Chart data={bookingData}/>
            </div>
             <div className='border border-green-600 text-green-700 h-fit px-4  py-24 rounded-lg font-extrabold text-5xl'>
               <h1>Number of   Bookings : <span>{BookingCount}</span></h1>
             </div>
          </div>
       </div>
       </div>
    </div>

  )
}

export default AdminHome
