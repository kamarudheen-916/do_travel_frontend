import React from 'react'
import './ShowImagePreview.css'





interface ModalProps {
    handleClose: () => void;
    data : string[]|undefined

}
const ShowImagesModal : React.FC<ModalProps> =(props)=> {

    

    return (
        <div className={'ShowImagesModal '} >
    
            <section className={`ShowImagesModal-main `} >
                <div className={`ShowImagesModal-header   `}>
                   <button className={`ShowImagesModal-Button text-green-800`} onClick={props.handleClose}>X</button>
                    <h1 className={`following_heding font-extrabold text-lg `}>Images</h1>
                </div>
                <div className="ShowImagesBody ">
                    {
                        props.data?.map((item,index)=>(
                            <div key={index}>
                                <img className='w-full' src={item} alt="" />
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
