import React, { useState } from 'react'
import { useTypedSelector } from '../../redux/reduxUseSelector';
// import { Room } from '../../Interfaces/interfaces';

import EditRoomForm from '../../components/editRoomForm/EditRoomForm';
import LineLoader from '../../components/Loading/LineLoader/LineLoader';


interface ModalProps {
    handleClose: () => void;
    RoomData : any
}

const RoomEdit : React.FC<ModalProps> =(props)=> {
    const [isLoading,setIsLoading] =useState(false)
    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
    return (
        <div className={'roomDetailesModal '} >
    
            <section className={`roomDetailesModal-main ${isDarkThemeOn ? 'bg-gray-900':''}`} >
                <div className={`roomDetailesModal-header  ${isDarkThemeOn ? 'bg-gray-900':'bg-white'} `}>
                   <button className={`roomDetailesModal-Button text-green-800`} onClick={props.handleClose}>X</button>
                    <h1 className={`following_heding font-extrabold text-lg `}>Edit Room</h1>
                   {isLoading && <LineLoader />}
                </div>
                <div className="roomDetaileBody ">
                 <EditRoomForm  setIsLoading={setIsLoading} data={props.RoomData} closeModal={props.handleClose}/>
                </div>
            </section>
        </div>
    );
}

export default RoomEdit
