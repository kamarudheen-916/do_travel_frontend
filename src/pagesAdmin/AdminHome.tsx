import React from 'react'
import AdminNav from '../componentsAdmin/AdminNav/AdminNav'
import TickPlacementBars from '../componentsAdmin/chart/Chart'

function AdminHome() {
  return (
    <div className=''>
       <div>
         <AdminNav />
       </div>
       <div className='h-dvh overflow-y-auto'>
          <div className='flex items-center justify-center'>
            <div className='p-10 w-1/2'>
              <TickPlacementBars/>
            </div>
             <div className='border border-green-700 text-green-900 h-fit px-4  py-24 rounded-lg font-extrabold text-5xl'>
               <h1>Number of users : <span>5000</span></h1>
             </div>
          </div>
          <div className='flex items-center justify-center'>
            <div className='p-10 w-1/2'>
              <TickPlacementBars/>
            </div>
             <div className='border border-green-700 text-green-900 h-fit px-4  py-24 rounded-lg font-extrabold text-5xl'>
               <h1>Number of Properties : <span>3300</span></h1>
             </div>
          </div>
          <div className='flex items-center justify-center'>
            <div className='p-10 w-1/2'>
              <TickPlacementBars/>
            </div>
             <div className='border border-green-700 text-green-900 h-fit px-4  py-24 rounded-lg font-extrabold text-5xl'>
               <h1>Number of  : Bookings<span>2000</span></h1>
             </div>
          </div>
       </div>
    </div>

  )
}

export default AdminHome
