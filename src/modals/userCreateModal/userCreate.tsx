import React, {  useState } from 'react';
import './userCreate.css';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";
import { userCreateShareAPI } from '../../APIs/UserAPI';
import Loading from '../../components/Loading/Loading';
import LineLoader from '../../components/Loading/LineLoader/LineLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTypedSelector } from '../../redux/reduxUseSelector';

// import FindLocation from '../../components/autoCompleteLocation/findLocation';
interface userCreateProps {
  modalCloseOpen: (isOpen: boolean) => void;
  reload?:React.Dispatch<React.SetStateAction<boolean>>
}

const userCreate: React.FC<userCreateProps> = (props) => {

  const isDarkModeOn = useTypedSelector(state=> state.darkTheme.isDarkTheme)
  
  const userName = localStorage.getItem('userName')
  const Profile :any = localStorage.getItem('userProfile')
  const [isEmojiOpen,setIsEmojiOpen] = useState(false)
  const [fileUrl, setFileUrl] = useState<string>('');
  const [textarea,setTextarea] = useState('')
  const [isNext,setNext] = useState<boolean>(false)
  const [isLoading,setIsLoading]= useState(false)
  const notifyError = (message:any) => toast.error(message,{
    position:"top-center",
    autoClose:1500,
    hideProgressBar:true
   });
   const notifySuccess = (message:string) => toast.success(message,{
    position:"top-center",
    autoClose:1500,
    hideProgressBar:true
   });
  const handleTextArea = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
      setTextarea(e.target.value)      
  }

  const onEmojiClick = (e:any) => {
    const sym = e.unified.split("_");
    const codeArray:any = [];
    sym.forEach((el:any) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setTextarea(textarea + emoji);

  };



  const handleFileURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        notifyError('Please select an image file.');
        e.target.value = ''; // Clear the file input
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFileUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  

  
  const handleUserShare =async (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) =>{
    e.preventDefault()
   setIsLoading(true)
    const userId = localStorage.getItem('userId')
    const userType = localStorage.getItem('userType')
    const response = await userCreateShareAPI({fileUrl,textarea,userId,userType,userName,Profile})
    // Dispatch()
    if(response.data.success){
      setIsLoading(false)
      props.modalCloseOpen(false)
      notifySuccess('successfully uploaded..!')
      if (props && props.reload) {
        props.reload(true);
      }
    }
  }

  return (
    <>
      <ToastContainer/>
      <div className='overLay'>  </div>
      <div className={ `userCreateModal ${isDarkModeOn ? 'bg-black text-white' :''} `}>
        <div className={`top_Div `}>
          <h3>Create New Post</h3>
          <button onClick={() => props.modalCloseOpen(false)}>X</button>
        </div>
        <div className='mainDiv'>
          <div className='uploadDiv'>
              {fileUrl && (
                  <div>
                  <div>
                    {fileUrl.startsWith('data:image') ? (
                        <img src={fileUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                      ) : (
                        <video controls src={fileUrl} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                      )}
                  </div>
                  <div className='text-center'>
                        {!isNext && <button onClick={()=>setNext(true)} className='nextButton'>Next</button>}
                  </div>
                  </div>
                  
              )}
              {!fileUrl &&
                  <div className='uploadUserFile'>
                      <i className='fa-solid fa-photo-film '></i>
                      <h3>Select photos and videos here</h3>
                      <input type='file' onChange={handleFileURL} id='uploadUserFile' accept="image/*"  />
                      <label  htmlFor='uploadUserFile' id='uploadUserFile_label'>Select from computer</label>
                  </div>
              }
          </div>
            { isNext &&  
            <div className='captionDiv'>
              {/* <div className='profileDiv flex  items-center'>
              {Profile ? (
                <img src={Profile} style={{ borderRadius: '50%', width: '50px', height: '50px' }} alt="Profile" />
              ) : (
                <i className="fa-solid fa-user" style={{fontSize:'30px'}}></i> 
              )}
                  <h1>{userName}</h1>
              </div> */}
              <div className=''>
                <textarea 
                placeholder='Enter your caption...' 
                className={`textArea_userCreate p-2 ${isDarkModeOn ? 'bg-slate-700':''} `} 
                onChange={handleTextArea} 
                value={textarea} 
                name="textArea"  
                style={{width:'100%'}} 
                cols={10} 
                rows={5} 
                maxLength={2000}
                />
                {/* <input className='captionInput' id='captionInput' type="text" placeholder='Write a caption' /> */}
                <div className=' flex justify-between '>
                  <BsEmojiSmile  onClick={()=>setIsEmojiOpen(!isEmojiOpen)}/>
                 {isEmojiOpen &&
                   <div className='relative  h-52 mt-5'>
                   <Picker 

                    data={data} 
                    maxFrequentRows={0} 
                    onEmojiSelect={onEmojiClick} 
                    previewPosition={'none'}
                    theme={'light'}
                    searchPosition={'none'}
                    
                     />
                     
                   {/* <EmojiPicker 
                   onEmojiClick={onEmojiClick}
                   searchDisabled
                    // data={data} 
                    // maxFrequentRows={0} 
                    // onEmojiSelect={onEmojiClick} 
                    // previewPosition={'none'}
                    // theme={'light'}
                    // searchPosition={'none'}
                    
                     /> */}
                 </div>
                 }
                    {/* <h1>0/220</h1> */}
                </div>
              </div>
              {/* <div className='flex justify-between'>
                <FindLocation />
                <i className="fa-solid fa-location-dot"></i>
              </div> */}
              <div >
                <p >Your followers can see your posts in their feeds and on your profile.</p>
              </div>
              <div>
               {!isLoading && 
                 <button  onClick={handleUserShare} className={`ShareButton`} disabled={isLoading}>
                  Share
                </button>
                }
                {
                  isLoading && <div><Loading /> <LineLoader/></div>
                }
              </div>
          </div>}
        </div>
        
        
      </div>
    
    </>
  );
};

export default userCreate;
