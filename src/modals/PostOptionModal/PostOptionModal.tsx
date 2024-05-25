import "./PostOptionModal.css";
import { useTypedSelector } from "../../redux/reduxUseSelector";
import { deletePostAPI, reportPostAPI } from "../../APIs/postAPI";
import { useEffect, useState } from "react";
import CustomAlert from "../../components/alerts/customAlerts/CustomAlerts";
import { ToastContainer, toast } from 'react-toastify';

interface ModalProps {
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    postId:string|undefined|null
    postUserId:string|undefined|null
    onDeleteRefresh?:React.Dispatch<React.SetStateAction<boolean>>;
}



const PostOptionModal: React.FC<ModalProps> = ({ handleClose,postId,postUserId,onDeleteRefresh }) => {

       const notifyError = (message:any) => toast.error(message,{
         position:"top-center",
         autoClose:1000,
         hideProgressBar:true
        });
        const notifySuccess = (message:string) => toast.success(message,{
            position:"top-center",
            autoClose:1000,
            hideProgressBar:true
           });
    const userId = localStorage.getItem('userId')
    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
    const [reload,setReload] = useState(false)
    const [isReport,setIsReport] =useState(false)
    const [reportReson,setReportReson] = useState<string>()
    const [customAlertMessage, setCustomAlertMessage] = useState<string>('');
    useEffect(()=>{

    },[reload])
    const handleDeletePost = async()=>{
        try {
            const res = await deletePostAPI(postId) 
            if(res?.data.success){
                setReload(!reload)
                if (onDeleteRefresh) {
                    onDeleteRefresh(false); // Check if onDeleteRefresh is defined before calling it
                }
                handleClose(false)
                setCustomAlertMessage(res.data.message)
            }else{
                notifyError(res?.data.message)
            }
        } catch (error) {
            console.log('handle delete post error in Post option modal :',error);
            
        }
    }
    const handleSubmitReport =async()=>{
        const data ={postId,reason:reportReson}
        const res = await reportPostAPI(data)
        if(res?.data.success){
            notifySuccess(res.data.message)
        }else{
            notifyError(res?.data.message)
        }
        setIsReport(false)
    }
    return (
        <div className={'PostOptionModal'}>
              <div>
      <ToastContainer/>
    </div>
            {customAlertMessage && (
        <CustomAlert message={customAlertMessage} onClose={() => setCustomAlertMessage('')} />
              )}
            <section className={`PostOptionModal-main ${isDarkThemeOn ? 'bg-gray-900':''}`}>
                <button className={`PostOptionModal-Button`} onClick={()=>handleClose(false)}>X</button>
                <div><h1 className={`PostOptionModal_heding`}>Options</h1></div>
                <div>
                <div className='text-center text-green-600 text-sm'>
                    { userId === postUserId &&
                     <h1 onClick={handleDeletePost} className='py-1 hover:bg-green-800 hover:bg-opacity-40 hover:text-white'>Delete</h1>
                     }
                      <div>
                           <h1 onClick={()=>setIsReport(!isReport)} className="py-1 hover:bg-green-800 hover:bg-opacity-40 hover:text-white cursor-pointer">Report</h1>
                          {isReport && <div >
                                <input onChange={(e)=>setReportReson(e.target.value)} type="text" placeholder="Reason.." className="px-2 py-1 rounded m-2 text-black"/>
                                <button onClick={handleSubmitReport} className="border border-green-700 px-2 py-1 rounded hover:bg-green-700 hover:text-white">Submit</button>
                           </div>}
                      </div>
                  </div>
                </div>
            </section>
        </div>
    );
};

export default PostOptionModal;
