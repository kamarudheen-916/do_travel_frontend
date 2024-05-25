import React, { useState } from 'react';
import "./RatingModal.css";
import { useTypedSelector } from '../../../redux/reduxUseSelector';
import { updateRoomRatingAPI } from '../../../APIs/propertyAPI';
import { Room } from '../../../Interfaces/interfaces';
import { ToastContainer, toast } from 'react-toastify';
interface props{ 
    isOpen: boolean,
     handleClose: () => void
     roomId:string
     }
const RatingModal: React.FC<props> = (props) => {
    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
  const [code, setCode] = useState("");
  const [ratingStar, setRatingStar] = useState<number[]>([0,0,0,0,0]);
  const [comment,setComment] = useState<string>('')
  const notifySuccess = (message:string) => toast.success(message,{
    position:"top-center",
    autoClose:1000,
    hideProgressBar:true
   });
   const notifyError = (message:any) => toast.error(message,{
     position:"top-center",
     autoClose:1000,
     hideProgressBar:true
    });

  if (!props.isOpen) return null;

  const handleRatingClick = async (starIndex: number) => {
   if(code === 'code123'){
    const updatedRatings = ratingStar.map((_, index) => (index <= starIndex ? 1 : 0));
    setRatingStar(updatedRatings)
    const res = await updateRoomRatingAPI(props.roomId, starIndex+1,comment);
    if(res?.data.success){
      notifySuccess(res.data.message);
      props.handleClose()
    }else{
      notifyError(res?.data.message);
    }
   }else{
    notifyError('Oops..! Wrong Customer code..!');
   }
  };

  return (
    <div className={`rating-modal-overlay  `} onClick={props.handleClose}>
        <ToastContainer/>
      <div className={`rating-modal-body  ${isDarkThemeOn ? 'bg-slate-800':''}`} onClick={(e) => e.stopPropagation()}>
        <button onClick={props.handleClose} className="close-button">X</button>
        <h2>Rate this room</h2>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your customer code..."
          className="rating-input"
        />
       { code == 'code123' && <div>

                      <div>
                        <input value={comment} onChange={(e)=>setComment(e.target.value)} type="text" name='ratingComment' className='rating-input' placeholder='Enter Your comment (optional)'/>
                    </div>
                <div className="text-green-600 text-center text-2xl">
                    {[...Array(5)].map((_, starIndex) => (
                        <i
                        key={starIndex}
                        className={`fa-star cursor-pointer ${ratingStar[starIndex] ? 'fa-solid' : 'fa-regular'}`}
                        onClick={() => handleRatingClick(starIndex)}
                        ></i>
                    ))}
                    </div>
        </div>}
      </div>
    </div>
  );
};

export default RatingModal;
