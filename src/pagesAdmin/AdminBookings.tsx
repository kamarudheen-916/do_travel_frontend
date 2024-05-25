
import AdminNav from '../componentsAdmin/AdminNav/AdminNav'
import BookingTable from '../components/atoms/Table/bookingTable'

function AdminBookings() {
  return (
    <div className='bg-slate-800 text-white'>
        <div>
            <AdminNav />
        </div>
        <div className='h-dvh'>
          <BookingTable />
        </div>
    </div>
  )
}

export default AdminBookings
