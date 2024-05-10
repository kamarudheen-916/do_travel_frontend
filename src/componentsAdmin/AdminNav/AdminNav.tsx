import React from 'react'
import Logo from '../../components/Home/subHomeComponents/Logo/Logo'
import { Link } from 'react-router-dom'

const AdminNav:React.FC=()=> {
  return (
    <div className='flex justify-between items-center px-10 border-b-2 border-green-700 text-green-700 h-16 '>
        <div>
            <Logo />
        </div>
        <div className='flex justify-between gap-16'>
            <Link to={'/adminHome'}><h1 className='cursor-pointer'>Home</h1></Link>
            <Link to={'/adminUser'}><h1 className='cursor-pointer'>Users</h1></Link>
            <Link to={'/adminProperties'}><h1 className='cursor-pointer'>Properties</h1></Link>
            <Link to={'/adminBookings'}><h1 className='cursor-pointer'>Bookings</h1></Link>
            <Link to={'/adminReports'}><h1 className='cursor-pointer'>Reports</h1></Link>
            <Link to={'/adminPosts'}><h1 className='cursor-pointer'>Posts</h1></Link>
            <Link to={'/adminRooms'}><h1 className='cursor-pointer'>Rooms</h1></Link>
        </div>
        <div>
            <h1>Admin Name</h1>
        </div>

    </div>
  )
}

export default AdminNav
