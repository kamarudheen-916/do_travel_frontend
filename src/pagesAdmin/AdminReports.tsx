
import ReportTable from '../components/atoms/Table/reportTable'
import AdminNav from '../componentsAdmin/AdminNav/AdminNav'

function AdminReports() {
  return (
    <div className='bg-slate-800 text-white'>
      <div>
        <AdminNav />
      </div>
      <div className='h-dvh'>
          <ReportTable />
      </div>
    </div>
  )
}

export default AdminReports
