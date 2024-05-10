
import AddRoomForm from '../../components/addRoomForm/addRoomForm'
import './AddRooms.css'

interface Props {
    closeModal:React.Dispatch<React.SetStateAction<boolean>>
}

const  AddRooms:React.FC<Props>=(props)=> {
  return (
    <div>
        <div className='addRoomsOverLay'></div>
        <div className='closeButton'>
            <span onClick={()=>props.closeModal(false)}>X</span>
        </div>
        <div className='addRoomsMain'>
            <AddRoomForm closeModal={props.closeModal}/>
        </div>
    </div>
  )
}

export default AddRooms
