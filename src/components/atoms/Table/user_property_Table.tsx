import React, { useState } from 'react';
import AdminEdit from '../../../modals/adminModals/adminEdit/adminEdit';
import { handleBolckOrUnBlockAPI } from '../../../API_admin/adminAPI';
import { ToastContainer, toast } from 'react-toastify';

type Column = {
  label: string;
  key: string;
};

type RowData = {
  [key: string]: any;
};

interface TableProps {
  columns: Column[];
  rows: RowData[] | undefined;
  showEditModal: boolean;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRows: any;
  userType:string;
}

const User_Property_Table: React.FC<TableProps> = ({ columns, rows, showEditModal, setShowEditModal, setRows,userType }) => {
  const notifySuccess = (message: string) => toast.success(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true
  });

  const notifyError = (message: any) => toast.error(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [editUserId, setEditUserId] = useState<string>();
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

  const handleEditModalClick = (userId: string) => {
    setShowEditModal(true);
    setEditUserId(userId);
  };

  const handleBolckOrUnBlock = async (userId: string) => {
    try {
      const res = await handleBolckOrUnBlockAPI(userId, userType);
      if (res.data.success) {
        notifySuccess(res.data.message);
        // Update the rows state in the parent component
        setRows((prevRows:any) =>
          prevRows.map((row:any) =>
            row._id === userId ? { ...row, isBlocked: !row.isBlocked } : row
          )
        );
      } else {
        notifyError(res.data.message);
      }
    } catch (error) {
      console.log('handle Block or unblock error :', error);
    }
  };

  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      <div>
        {showEditModal && <AdminEdit userId={editUserId} userType={userType} isEditProfile={setShowEditModal} />}
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
            <tr key={rowIndex} className='border'>
              <td>{row.firstName||row.PropertyName}</td>
              <td className='text-center py-2'>
                {row.Profile||row.PropertyProfile  ?( <img className='max-w-24 max-h-24 m-auto' src={row.Profile||row.PropertyProfile} alt="" /> ):( <i className='fa-solid fa-user text-6xl'></i>)}
              </td>
              <td>{row.email}</td>
              <td>************</td>
              <td><i onClick={() => handleEditModalClick(row._id)} className='fa-solid fa-pencil cursor-pointer'></i></td>
              <td onClick={() => handleBolckOrUnBlock(row._id)} className='cursor-pointer'>
                {row.isBlocked ?
                  <i className='fa-solid fa-lock text-red-700'></i> :
                  <i className='fa-solid fa-lock-open'></i>}
              </td>
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
    </div>
  );
};

export default User_Property_Table;
