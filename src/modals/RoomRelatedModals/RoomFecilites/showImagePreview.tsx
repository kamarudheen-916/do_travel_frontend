import React, { SetStateAction, useState } from 'react'
import './ShowImagePreview.css'
import { useTypedSelector } from '../../../redux/reduxUseSelector';
import { Room } from '../../../Interfaces/interfaces';
import { ToastContainer, toast } from 'react-toastify';




interface ModalProps {
    handleClose: () => void;
    data : string[]|undefined
    setRoomData:React.Dispatch<SetStateAction<Room>>
}
const ShowImagesModal : React.FC<ModalProps> =(props)=> {
  const notifyError = (message:any) => toast.error(message,{
    position:"top-center",
    autoClose:2000,
    hideProgressBar:true
   });
    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
    const [editImageIndex, setEditImageIndex] = useState<number | null>(null);
    const handleRomveImage =(index:number)=>{
      props.setRoomData(prev =>({
        ...prev,
        images:prev.images.filter((_,i) => i !== index)
      }))
    }
    const handleEditImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || editImageIndex === null) return;
    
        const file = files[0];
        if (file.type.startsWith('image/')) {
          const base64String = await readFileAsDataURL(file);
          props.setRoomData(prev => ({
            ...prev,
            images: prev.images.map((img, i) => i === editImageIndex ? base64String : img)
          }));
        } else {
          notifyError('Selected file is not an image');
        }
        setEditImageIndex(null); // Reset the edit index after editing
      };
    
      const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };
    return (
        <div className={'ShowImagesModal '} >
          <ToastContainer />
            <section className={`ShowImagesModal-main ${isDarkThemeOn ? 'bg-gray-900':''}`} >
                <div className={`ShowImagesModal-header  ${isDarkThemeOn ? 'bg-gray-900':'bg-white'} `}>
                   <button className={`ShowImagesModal-Button text-green-800`} onClick={props.handleClose}>X</button>
                    <h1 className={`following_heding font-extrabold text-lg `}>Images</h1>
                </div>
                <div className="ShowImagesBody flex gap-2 flex-wrap">
                    {
                        props.data?.map((item,index)=>(
                            <div key={index} className='w-3/12 flex-grow max-w-52'>
                                <img className='w-full max-w-52 h-52' src={item} alt="" />
                                <div className='flex p-2 gap-2'>
                                    <h1 onClick={()=>handleRomveImage(index)} className='bg-green-800 w-full  mb-5 cursor-pointer text-center hover:bg-green-700'>Remove</h1>
                                    <label htmlFor={`editImage${index}`} onClick={() => setEditImageIndex(index)} className='bg-green-800 w-full mb-5 cursor-pointer text-center hover:bg-green-700'>Edit</label>
                                     <input type="file" hidden accept="image/*" onChange={handleEditImage} name={`editImage${index}`} id={`editImage${index}`} />
                                </div>
                            </div>
                        ))
                    }
                    <div>
                        {
                           props.data && props.data.length < 1 &&
                            <div className="text-center border border-green-600 placeholder py-6 px-12 rounded mx-20 my-8">
                                <p className="mr-2 font-extrabold text-gray-500 text-3xl">There are No Images</p>
                                <i className="fas fa-bell-slash text-gray-500 text-2xl"></i>
                          </div>
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ShowImagesModal
