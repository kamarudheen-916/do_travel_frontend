import React, { useEffect, useState } from 'react'
import { PostReport } from '../../../Interfaces/interfaces'
import {  fetchAllPostReportDataAPI } from '../../../API_admin/adminAPI';
import ShowReportedPost from '../../../modals/adminModals/postShowModal/showPost';

const ReportTable:React.FC=()=> {
  const [rows,setRows] =useState<PostReport[]>([])

  const [PostId,setPostId] = useState<string>()
  const [isDeletedPostShow,setIsDeletedShow] = useState<boolean>(false)
  const [isShowReportedPost,setShowReportedPost] = useState<boolean>(false)
  const columns = [
    { label: 'Reporter Name ', key: 'ReporterName' },
    { label: 'Post Id ', key: 'PostId' },
    // { label: 'Preview', key: 'Preview' },
    { label: 'Reson', key:'Reson'},
    { label: 'Reported Date', key:'ReportedDate'},
    { label: 'Status',key:'status'},
    { label: 'View Post',key:'ViewPost'},
  ];

  const showReportedPost = (postId:string)=>{
    setPostId(postId)
    setShowReportedPost(true)
    setIsDeletedShow(false)

  }
  const showDeletedPost = (postId:string)=>{
    setPostId(postId)
    setShowReportedPost(true)
    setIsDeletedShow(true)
  }
  async function fetchAllUserData (){
    const res = await fetchAllPostReportDataAPI()
    if(res?.data.success){
      console.log(res.data);
      setRows(res.data.data)
    }
  }

  useEffect(()=>{
    fetchAllUserData()
  },[isShowReportedPost])




  const [currentPage, setCurrentPage] = useState(0);
//   const [editUserId, setEditUserId] = useState<string>();
  const rowsPerPage = 10;

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
      {rows.length > 0 && <div>
      <div>
       { isShowReportedPost && <ShowReportedPost isDeletedPost={isDeletedPostShow} postId={PostId} closeModal={()=>setShowReportedPost(false)}  />}
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
              <td>{row.reporterName}</td>
              <td>{row.postId}</td>

              <td className='text-red-400'>" {row.reason} "</td>
              <td>{row.reportDate.toString().split('T')[0]}</td>
              <td className={`${row.status === 'Deleted' ? 'text-red-400':'text-yellow-500'}`}>{row.status}</td>
              {row.status !== 'Deleted' ?<td onClick={()=>showReportedPost(row.postId)} className='text-blue-400 cursor-pointer'>Click here</td>: 
              <td onClick={()=>showDeletedPost(row.postId)} className='text-red-400'>Deleted</td>}
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
      </div>}
      {rows?.length < 1 &&
      <div className='flex justify-center '>
            <div className='border border-green-600 px-48 py-24 text-2xl font-bold my-10'>
                <h1>No Reports </h1>
            </div>
     </div>}
    </div>
  )
}

export default ReportTable
