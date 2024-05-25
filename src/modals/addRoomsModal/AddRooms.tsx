
import AddRoomForm from '../../components/addRoomForm/addRoomForm'
import { useTypedSelector } from '../../redux/reduxUseSelector'
import './AddRooms.css'

interface Props {
    closeModal:React.Dispatch<React.SetStateAction<boolean>>
}

const  AddRooms:React.FC<Props>=(props)=> {
  const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
  return (
    <div >
        <div className='addRoomsOverLay'></div>
        <div className='closeButton'>
            <span onClick={()=>props.closeModal(false)}>X</span>
        </div>
        <div className={`addRoomsMain ${isDarkThemeOn ? 'bg-black':''}`} >
          <div className='text-center bg-slate-500 '>Add Room</div>
            <AddRoomForm closeModal={props.closeModal}/>
        </div>
    </div>
  )
}

export default AddRooms
