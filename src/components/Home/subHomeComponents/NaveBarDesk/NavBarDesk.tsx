import Naves from "../Naves/Naves"
import Logo from "../Logo/Logo"
import './NavBarDesk.css'
import { TypedUseSelectorHook, useDispatch } from "react-redux"
import UserCreateModal from "../../../../modals/userCreateModal/userCreate"
import {  useEffect, useState } from "react"
import {  Link, useNavigate } from "react-router-dom"
import SearchScreen from "../../../../pages/Search/SearchScreen"
import { userSearchAPI } from "../../../../APIs/searchAPI"
import {  searchData } from "../../../../Interfaces/interfaces"
import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { fetchFollwerRequestAPI } from "../../../../APIs/followAPI" 
import { getThemModeAPI, setThemModeAPI } from "../../../../APIs/themeModeAPi"
import Cookies from "js-cookie";
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
interface props{
  reload?:React.Dispatch<React.SetStateAction<boolean>>
}

const NavBarDesk:React.FC<props> = (props)=> {

  const isDark = useTypedSelector(state=>state.darkTheme.isDarkTheme)
  const [isCreateOpen,setIsCreateOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchResult,setSearchResult] = useState<searchData[]>([])
  const [isDarkModeOn,setDarkModeOn] = useState<boolean>(false)
  const [searchInput,setSearchInput]= useState('')
  const [notificaionCount,setnotificaionCount]= useState(0)
  const [messageCount,setmessageCount]= useState(0)
  // const count = useSelector((state:RootState)=>state.notification)
  const userId = Cookies.get('userId')
  useEffect(()=>{
    const fetch = async ()=>{

      const res = await fetchFollwerRequestAPI(localStorage.getItem('userId'))
      setnotificaionCount(res?.data.length)
  }
  fetch()
  },[])
  const Navigate =  useNavigate()
  const Dispatch = useDispatch()
  const handleLogout =()=>{
    localStorage.removeItem('token')
    Dispatch({type:'logout',payload:null})
  }
  
  const handleDarkMode =()=>{
    async function setMode(){
      setDarkModeOn(!isDarkModeOn)
      const newMode = !isDarkModeOn ? 'darkMode' : 'normalMode';
      const res =await setThemModeAPI(newMode,userId)
      if(res.data.success){
        Dispatch({ type: newMode });
      }else{
        Dispatch({type:'normalMode'})
      }
    }
    setMode()
  }
  useEffect(()=>{
    async function getThemMode(){
     const res = await getThemModeAPI()
     if(res){
      Dispatch({type:res.data})
     }else{
      Dispatch({type:'normalMode'})
     }
    }
    getThemMode()
  },[])
  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleOnSearch = async(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchInput(e.target.value)
    const res = await userSearchAPI(searchInput)
    if(res){
      console.log(res.data);
      setSearchResult(res.data)
    }
  }
  useEffect(()=>{
    setSearchResult([])
  },[isSearchOpen])
 
  return (
    <div className={`NavBarForDesk overflow-hidden h-dvh  flex flex-col ${isDark ? 'bg-black ':'bg-white'} `}>
        <div className="NavbarLogo ">
          <Logo/>
        </div>
        <Naves  onClick={()=>Navigate('/')} icon={<i className="fa-solid fa-house text-xl"></i>} iconName="Home" />
        <Naves icon={<i className="fa-solid fa-magnifying-glass text-xl"></i>} onClick={handleSearch} iconName="Search" />
       <div className="">
           <Link to={'/notifications'}>
            <Naves count={notificaionCount}   icon={<i className="fa-solid fa-bell text-xl"></i>} iconName="Notification" />
          </Link>
       </div>
        <Naves count={messageCount}  icon={<i className="fa-solid fa-envelope text-xl"></i>} iconName="Message" />
        <Naves  icon={<i className="fa-solid fa-square-plus text-xl"></i>} onClick={()=>setIsCreateOpen(true)} iconName="Create" />
        <Naves  icon={<i className="fa-solid fa-paperclip text-xl"></i>} iconName="Bookings" />
        <Naves  icon={<i className="fa-solid fa-moon text-xl"></i>} iconName="Theme" onClick={handleDarkMode} />
        <Link to={'/userProfile'} >
          <Naves  icon={<i className="fa-solid fa-user text-xl"></i>} iconName="Profile" />
        </Link>
        <Naves onClick={handleLogout}  icon={<i className="fa-solid fa-right-from-bracket text-2xl"></i>} iconName="Log out" />

        <div className="createModals">
           {isCreateOpen &&<UserCreateModal reload={props.reload}  modalCloseOpen={setIsCreateOpen}/>}
        </div>
        
        {isSearchOpen && <SearchScreen searchInputValue={searchInput} searchData={searchResult} onChange={handleOnSearch}  onClose={() => setIsSearchOpen(false)} />}
       
    </div>
  )
}

export default NavBarDesk
