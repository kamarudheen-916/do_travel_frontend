import React from 'react'
import Logo from '../../components/Home/subHomeComponents/Logo/Logo'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminLogOut } from '../../reducers/adminSlice'
import Cookies from 'js-cookie'

const AdminNav:React.FC=()=> {
  const Dispatch = useDispatch()
  const handleAdminLogOut = ()=>{
    Cookies.remove('adminToken')
    Dispatch(adminLogOut())
  }
  return (
    <div className='flex justify-between items-center px-10 border-b-2 border-green-700 text-green-500 h-16 '>
        <div>
            <Logo />
        </div>
        <div className='flex justify-between gap-16'>
            <Link to={'/admin/adminHome'}><h1 className='cursor-pointer'>Home</h1></Link>
            <Link to={'/admin/adminUser'}><h1 className='cursor-pointer'>Users</h1></Link>
            <Link to={'/admin/adminProperties'}><h1 className='cursor-pointer'>Properties</h1></Link>
            <Link to={'/admin/adminBookings'}><h1 className='cursor-pointer'>Bookings</h1></Link>
            <Link to={'/admin/adminReports'}><h1 className='cursor-pointer'>Reports</h1></Link>
            {/* <Link to={'/admin/adminPosts'}><h1 className='cursor-pointer'>Posts</h1></Link>
            <Link to={'/admin/adminRooms'}><h1 className='cursor-pointer'>Rooms</h1></Link> */}
        </div>
        {/* <div>
            <h1>Admin Name</h1>
        </div> */}
        <div onClick={handleAdminLogOut} className='cursor-pointer'>
          Log-out
        </div>

    </div>
  )
}

export default AdminNav
