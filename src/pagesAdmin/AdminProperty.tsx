import  { useEffect, useState } from 'react'
import AdminNav from '../componentsAdmin/AdminNav/AdminNav'
import TableComponent from '../components/atoms/Table/user_property_Table'
import { fetchAllUserDataAPI } from '../API_admin/adminAPI';
import { UserFormData } from '../Interfaces/interfaces';

const AdminProperty:React.FC =()=> {

  const [rows,setRows] =useState<UserFormData[]>()
  const [showEditModal,setShowEditModal] = useState(false)
  const columns = [
    { label: 'Name', key: 'firstName' },
    { label: 'Profile', key: 'Profile' },
    { label: 'Email', key:'email'},
    { label: 'Password',key:'password'},
    { label: 'Edit',key:'edit'},
    { label: 'Block',key:'isBlocked'},
  ];

  useEffect(()=>{
    async function fetchAllUserData (){
      const res = await fetchAllUserDataAPI('property')
      if(res?.data.success){
        console.log(res.data);
        setRows(res.data.data)
      }
    }
    fetchAllUserData()
  },[showEditModal])

  return (
    <div className='bg-slate-800 text-white'>
        <div>
            <AdminNav />
        </div>
        <div className='h-dvh'>
          <TableComponent userType={'property'}  setShowEditModal={setShowEditModal} showEditModal={showEditModal} columns={columns} setRows={setRows} rows={rows}/>
        </div>
    </div>
  )
}

export default AdminProperty
