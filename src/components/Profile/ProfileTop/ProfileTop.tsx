import { useEffect, useState } from "react"
import './PorfileTop.css'
import EditProfile from "../../../modals/editProfileModal/editProfile"
import { cancelFollReqAPI, checkIsFollwoedAPI, fetchFollowDataAPI, followRequestAPI, unFollowAPI } from "../../../APIs/followAPI"
import { followSchemaInterface } from "../../../Interfaces/interfaces"
import FollowingModal from "../../../modals/showFollowerModal/followingModal"
interface ProfileTopProps{
    profile :string,
    userName:string | null
    numberOfPosts:number
    isOthersProfile:boolean
    otherProfileId?:string
    isProperty:boolean|undefined
}
const  ProfileTop :React.FC <ProfileTopProps>=(props)=> {  
  const userId = localStorage.getItem("userId");
  const currentUserType = localStorage.getItem("userType");
  const [profile,setProfile] =useState(props?.profile||'')
  const [isEditProfile,setEditProfile] =  useState<boolean>(false)
  const [isFollwoed,setIsFollowed] = useState<boolean>(false)
  const [isFollowing,setIsFollowing] = useState<boolean>(false)
  const [isFolRequested,setIsFolRequested] = useState<boolean>(false)
  const [followersData,setFollowersData] = useState([])
  const [followingsData,setFollowingsData] = useState([])
  const [showFollowingModal, setShowFollowingModal] = useState<boolean>(false);
  const [showFollowerModal, setShowFollowerModal] = useState<boolean>(false);
  
  const handleFollowRequest = async()=>{
    try {
      const followUserType = props.isProperty ? 'property':'user'
      const follwo_Req_Res = await followRequestAPI(userId,currentUserType,props.otherProfileId,followUserType) 
      if(follwo_Req_Res.data.success){
        setIsFolRequested(true)
      }
    } catch (error) {
      console.log('handle follow request error:',error);
    }
  }
  const handleCancellRequest = async ()=>{
    try {
      const res = await cancelFollReqAPI(userId,props.otherProfileId)
      if(res.data.success){
        setIsFolRequested(false)
      }
    } catch (error) {
      console.log('handleCancelRequest error in profiletop page',error);
      
    }
  }
  const handleUnfollow = async ()=>{
    try {
      const followUserType = props.isProperty ? 'property':'user'
      const unFollowRep = await unFollowAPI(userId,props.otherProfileId,followUserType)
      console.log(unFollowRep);
      if(unFollowRep.data.success){
        setIsFollowed(false)
      }
      
    } catch (error) {
      console.log('hanle unfollow error in ProfileTop',error);
       
    }
  }
  useEffect(() => {
    setProfile(props.profile || '');
  }, [props.profile]);

 useEffect(() => {
  if(props.isOthersProfile){
    async function checkIsFollowed() {
      const Res = await checkIsFollwoedAPI(userId, props.otherProfileId, props.isProperty);
      if (Res.data.success) {
        console.log('check is followed :',Res.data);
            if(Res.data.isAccepted){
            setIsFollowed(true);
            }else{
              console.log('is follow resqueseted ',isFolRequested);
              setIsFolRequested(true)
            }
      }else{
        console.log('set is followed is flse');
        
        setIsFollowed(false);
        setIsFolRequested(false)
      }
    }
    checkIsFollowed();
    
  }
}, [userId, props.otherProfileId, props.isProperty]);

useEffect(()=>{
  async function fetchAllFollowdata (){
    const id = props.isOthersProfile ? props.otherProfileId : userId
  const Res =await fetchFollowDataAPI(id)
  if(Res.data){
    console.log('Res.data',Res.data);
    
    setFollowersData(Res.data.followerData)    
    setFollowingsData(Res.data.followingData)    
  }
  // console.log("fetchfollowData api ",Res);
  }
  fetchAllFollowdata()
},[])
const handleShowFollowersDetails = () => {
  setShowFollowerModal(true);
  setIsFollowing(false);
};

const handleShowFollowingsDetails = () => {
  setShowFollowingModal(true);
  setIsFollowing(true);
};

  return (

    <div className='profileImg flex p-5' >
          <div>
            {
              profile !== '' ?
            <img src={profile}  className='rounded-full ' alt="" />
              :
              <i className="fa-solid fa-user" style={{ fontSize: "70px" ,marginTop:'10px', color:'#178834'}}></i>}
          </div>
          <div className=''>
              <div className='flex gap-8 userName'>
                <h1 >{props.userName}</h1>
                {!props.isOthersProfile && <button onClick={()=>setEditProfile(true)} className='EditProfileButton '>Edit Profile</button>}
                {props.isOthersProfile && !isFolRequested && !isFollwoed&& <button onClick={handleFollowRequest} className='EditProfileButton ml-5'>Follow</button>}
                {props.isOthersProfile && isFolRequested &&
                <div className={`${userId === props.otherProfileId ? 'hidden':'block'}`}>
                    <button  onClick={handleCancellRequest} className='EditProfileButton ml-5'>Cancel Request</button>
                </div> 
                }
                
                {isFollwoed && !isFolRequested&& <button onClick={handleUnfollow} className='EditProfileButton ml-5'>Unfollow</button> }

              </div>
              <div className='flex gap-8 followerDiv'>
                <h1>{props.numberOfPosts} posts</h1>
                <h1 onClick={handleShowFollowersDetails}>{followersData?.length || 0} followers</h1>
                <h1 onClick={handleShowFollowingsDetails}>{followingsData?.length || 0} following</h1>
                {showFollowingModal && followingsData?.length >0 && <FollowingModal userId={props.isOthersProfile ? props.otherProfileId : userId} isFollwoing={isFollowing} data={followingsData} handleClose={() => setShowFollowingModal(false)} show={showFollowingModal} />}
                {showFollowerModal && followersData?.length >0 && <FollowingModal userId={props.isOthersProfile ? props.otherProfileId : userId} isFollwoing={isFollowing} data={followersData} handleClose={() => setShowFollowerModal(false)} show={showFollowerModal} />}
              </div>

          </div>
          {isEditProfile && 
            <EditProfile setProfile={setProfile} profileUrl={profile} isEditProfile={setEditProfile} />
          }
        </div>
  )
}

export default ProfileTop
