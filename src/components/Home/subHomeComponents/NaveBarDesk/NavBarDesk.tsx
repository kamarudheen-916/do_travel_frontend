import Naves from "../Naves/Naves"
import Logo from "../Logo/Logo"
import './NavBarDesk.css'
import { useDispatch } from "react-redux"
import UserCreateModal from "../../../../modals/userCreateModal/userCreate"
import {  useState } from "react"

interface props{
  reload : ()=>void
}

const NavBarDesk:React.FC<props> = ({reload})=> {
  const [isCreateOpen,setIsCreateOpen] = useState<boolean>(false)
  

  const Dispatch = useDispatch()
  const handleLogout =()=>{
    localStorage.removeItem('token')
    Dispatch({type:'logout',payload:null})
  }
  return (
    <div className="NavBarForDesk  h-dvh flex flex-col ">
        <Logo/>
        <Naves  icon={<i className="fa-solid fa-house text-2xl"></i>} iconName="Home" />
        <Naves  icon={<i className="fa-solid fa-magnifying-glass text-2xl"></i>} iconName="Search" />
        <Naves   icon={<i className="fa-solid fa-bell text-2xl"></i>} iconName="Notification" />
        <Naves  icon={<i className="fa-solid fa-envelope text-2xl"></i>} iconName="Message" />
        <Naves  icon={<i className="fa-solid fa-square-plus text-2xl"></i>} onClick={()=>setIsCreateOpen(true)} iconName="Create" />
        <Naves  icon={<i className="fa-solid fa-paperclip text-2xl"></i>} iconName="Bookings" />
        <Naves  icon={<i className="fa-solid fa-moon text-2xl"></i>} iconName="Theme" />
        <Naves onClick={handleLogout}  icon={<i className="fa-solid fa-right-from-bracket text-2xl"></i>} iconName="Log out" />

        <div className="createModals">
           {isCreateOpen &&<UserCreateModal reload={reload} modalCloseOpen={setIsCreateOpen}/>}

        </div>
    </div>
  )
}

export default NavBarDesk
