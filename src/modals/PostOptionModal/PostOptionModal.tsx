import "./PostOptionModal.css";
import { useTypedSelector } from "../../redux/reduxUseSelector";
import { deletePostAPI } from "../../APIs/postAPI";
import { useEffect, useState } from "react";
import CustomRedAlert from "../../components/alerts/customAlerts/customRedAlert";
import CustomAlert from "../../components/alerts/customAlerts/CustomAlerts";


interface ModalProps {
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    postId:string|undefined|null
    postUserId:string|undefined|null
    onDeleteRefresh?:React.Dispatch<React.SetStateAction<boolean>>;
}



const PostOptionModal: React.FC<ModalProps> = ({ handleClose,postId,postUserId,onDeleteRefresh }) => {

    const userId = localStorage.getItem('userId')
    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
    const [reload,setReload] = useState(false)
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
                alert(res?.data.message)
            }
        } catch (error) {
            console.log('handle delete post error in Post option modal :',error);
            
        }
    }
    return (
        <div className={'PostOptionModal'}>
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
                      <h1 className="py-1 hover:bg-green-800 hover:bg-opacity-40 hover:text-white">Report</h1>
                  </div>
                </div>
            </section>
        </div>
    );
};

export default PostOptionModal;
