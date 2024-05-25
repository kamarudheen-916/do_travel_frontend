import React, { SetStateAction } from 'react'
import './ShowImagePreview.css'
import { useTypedSelector } from '../../../redux/reduxUseSelector';
import { Room } from '../../../Interfaces/interfaces';



interface ModalProps {
    handleClose: () => void;
    data : string[]|undefined
    setData:React.Dispatch<SetStateAction<Room>>
}
const ShowImagesModal : React.FC<ModalProps> =(props)=> {
    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
    
    const handleRomveImage =(index:number)=>{
      props.setData(prev =>({
        ...prev,
        images:prev.images.filter((_,i) => i !== index)
      }))
    }
    return (
        <div className={'ShowImagesModal '} >
    
            <section className={`ShowImagesModal-main ${isDarkThemeOn ? 'bg-gray-900':''}`} >
                <div className={`ShowImagesModal-header  ${isDarkThemeOn ? 'bg-gray-900':'bg-white'} `}>
                   <button className={`ShowImagesModal-Button text-green-800`} onClick={props.handleClose}>X</button>
                    <h1 className={`following_heding font-extrabold text-lg `}>Images</h1>
                </div>
                <div className="ShowImagesBody ">
                    {
                        props.data?.map((item,index)=>(
                            <div key={index}>
                                <img className='w-full' src={item} alt="" />
                                <h1 onClick={()=>handleRomveImage(index)} className='bg-green-800 w-full mb-5 cursor-pointer text-center hover:bg-green-700'>Remove</h1>
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
