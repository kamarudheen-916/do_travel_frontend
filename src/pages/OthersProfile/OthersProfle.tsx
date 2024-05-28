import React, { useEffect, useState } from 'react'
import NavBarDesk from '../../components/Home/subHomeComponents/NaveBarDesk/NavBarDesk'
import { useTypedSelector } from '../../redux/reduxUseSelector'
import { userPost } from '../../Interfaces/interfaces'
import {  getOthersProfilePostsAPI } from '../../APIs/UserAPI'
import {  useParams } from 'react-router-dom';
import OtherProfileMain from '../../components/otherProfle/otherProfileMain'
import { useDispatch } from 'react-redux'


const OthersProfle:React.FC=()=> {
  const Dispatch = useDispatch()
  // const navigate = useNavigate();
    const { profileId, isProperty } = useParams<any>();
    const [otherProfileId,setOtherProfileId]=useState(profileId)
    const [otherProfilIsProperty,setOtherProfilIsProperty]=useState(isProperty)
    const otherProfileType =  otherProfilIsProperty === 'true' ? true : false
    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
    const [allPosts, setAllPosts] = useState<userPost[]>([]);
    const [otherProfileData,setOtherProfile]=useState()
    const [isOpenProfileModal,setIsOpenProfileModal] = useState<boolean>(false)
    const [reload,setReload] =useState<boolean>(false)

    const fetchUserPosts = async()=>{
      try {
          const userId = otherProfileId  
          const ProfileType = otherProfileType ? 'property':'user'
        //   console.log('isProperty:',otherProfileType);
          
          const Res = await getOthersProfilePostsAPI(userId,ProfileType)
          // console.log('Other users Res:',Res.data);
          
          if(Res?.data.getPosts){
            setAllPosts(Res.data.getPosts.allPosts)
            setOtherProfile(Res.data.userData.user)
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
    useEffect(() => {
        setOtherProfileId(profileId)
        setOtherProfilIsProperty(isProperty)
    }, [profileId, isProperty])

    useEffect(() => {
        fetchUserPosts()
    }, [otherProfileId, otherProfilIsProperty,isOpenProfileModal, reload])

    // useEffect(()=>{
    //     setOtherProfileId(profileId)
    //     setOtherProfilIsProperty(otherProfilIsProperty)
    // },[profileId,otherProfilIsProperty])
    // useEffect(()=>{    
    //       fetchUserPosts()
    //       setReload(false)
    //   },[isOpenProfileModal,reload])
    return (
      <div className={`flex ${isDarkThemeOn ? 'bg-black text-white':''}`}>
          <div className='navBar'>
              <NavBarDesk  reload={setReload} />
          </div>
          <div className='ProfileMain w-full flex justify-center '>
              <OtherProfileMain 
              isProperty={otherProfileType}
              otherProfileData={otherProfileData}
              isOthersProfile={true}
              setIsOpenProfileModal={setIsOpenProfileModal} 
              isOpenProfileModal={isOpenProfileModal} 
              allPosts={allPosts}
              otherProfileId={otherProfileId}/>
          </div>
      </div>
    )
}

export default OthersProfle
