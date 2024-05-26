
import { useEffect, useState } from 'react';
import NavBarDesk from '../../components/Home/subHomeComponents/NaveBarDesk/NavBarDesk'
import ProfileMain from '../../components/Profile/ProfileMain/ProfileMain'
import {  getAllPostsAPI } from '../../APIs/UserAPI';
import { userPost } from '../../Interfaces/interfaces';
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
function Profile() {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
  const [allPosts, setAllPosts] = useState<userPost[]>([]);
  const [isOpenProfileModal,setIsOpenProfileModal] = useState<boolean>(false)
  const [reload,setReload] =useState<boolean>(false)
  const fetchUserPosts = async()=>{
    try {
        const Res = await getAllPostsAPI()
        if(Res?.data){                    
          setAllPosts(Res.data.allPosts)
          console.log('all Posts :',allPosts);
        }else {
          throw new Error(Res?.data.message)
        }
    } catch (error:any) {
      console.log('Fetch user posts error in Profile main component :',error);
      if (error.response && error.response.data) {
        if (
          error.response.status === 401 &&
          error.response.data.message === "User is blocked !!"
        ) {
          localStorage.removeItem("token");
          Dispatch({ type: "logout", payload: null });

        }
      }
    }
  };  
  useEffect(()=>{    
        fetchUserPosts()
        setReload(false)
    },[isOpenProfileModal,reload])
  return (
    <div className={`flex ${isDarkThemeOn ? 'bg-black text-white':''}`}>
        <div className='navBar'>
            <NavBarDesk  reload={setReload} />
        </div>
        <div className='ProfileMain w-full flex justify-center '>
            <ProfileMain 
            setIsOpenProfileModal={setIsOpenProfileModal} 
            isOpenProfileModal={isOpenProfileModal} 
            allPosts={allPosts}/>
        </div>
    </div>
  )
}

export default Profile
