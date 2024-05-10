import './otherProfileMain.css'
import ProfileModal from '../../modals/userProfileModal/profileModal';
import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
import { PropertyFormData, Room, UserFormData, userPost } from '../../Interfaces/interfaces';
import { fetchOthersProfileRoomDataAPI } from '../../APIs/propertyAPI';
import ProfileTop from '../Profile/ProfileTop/ProfileTop';
import PostShow from '../Profile/ProfilePostShow/PostShow';
import NoPost from '../noPostsIcon/NoPosts';
import Rooms from '../Profile/PropertyRooms/Rooms';
import AddRooms from '../../modals/addRoomsModal/AddRooms';



interface props {
  allPosts:userPost[]
  isOpenProfileModal:boolean;
  setIsOpenProfileModal:React.Dispatch<React.SetStateAction<boolean>>
  isOthersProfile?:boolean
  otherProfileData:any
  otherProfileId?:string
  isProperty:boolean|undefined
}

const OtherProfileMain:React.FC<props> = ({allPosts,isOpenProfileModal,setIsOpenProfileModal,otherProfileId,isOthersProfile,otherProfileData,isProperty})=> {

  const userType = isProperty ? 'property':'user'
  const [isRoom,setIsRoom] = useState<boolean>(true)  
  const [isAddRoom,setAddRoom] = useState<boolean>(false)
  const [roomData,setRoomData] = useState<Room[]>()
  // const [isOpenProfileModal,setIsOpenProfileModal] = useState<boolean>(false)
  const [modalData,setModalData] = useState<userPost[]>()


    
  const propertyData:PropertyFormData = otherProfileData 
  const normalUserData:UserFormData = otherProfileData 
  
  const userName = isProperty ? propertyData?.PropertyName: normalUserData?.firstName
  const porfile:any = isProperty ? propertyData?.PropertyProfile: normalUserData?.Profile
    
  const onPostClick = (post:userPost)=>{
    const datas = allPosts.filter((item)=> item._id !== post._id)
    datas.unshift(post)
  
    setIsOpenProfileModal(true)
    setModalData(datas)
  } 
  useEffect(()=>{
    console.log('userType :======',userType);
    
    if(userType === 'user'){
      setIsRoom(false)
    }
  },[isProperty])
  
 useEffect(()=>{  
    if(userType === 'property'){
      const fetchRoomData =async ()=>{ 
        const res = await fetchOthersProfileRoomDataAPI(otherProfileId)
        if(res){
          setRoomData(res.data.reverse())          
        } 
    }
    fetchRoomData()
    }
  },[isAddRoom,isRoom])
  return (
    <div className='max-w-4xl min-w-96  h-dvh overflow-y-scroll relative'>
      <div className='profileTopDiv'>
        <ProfileTop 
        isProperty={isProperty}
        otherProfileId={otherProfileId}
        isOthersProfile={isOthersProfile? 
        isOthersProfile:false} 
        numberOfPosts={allPosts?.length} 
        profile={porfile} 
        userName={userName} />
      </div>

      {userType === 'property' &&  allPosts?.length > 0 && 
        <div className='border-green-800 border-2  flex  '>
            <div onClick={()=>setIsRoom(false)} className={`font-bold w-full  text-center cursor-pointer ${!isRoom ? `bg-green-800 text-white`:`` } ${isRoom ? `hover:bg-gray-200`:`` }    `}>
               Posts
            </div>
            <div onClick={()=>setIsRoom(true)} className={`font-bold w-full text-center cursor-pointer ${isRoom ? `bg-green-800 text-white`:`` } ${!isRoom ? `hover:bg-gray-200`:`` }  `}>
              Rooms
            </div>
        </div>
        }

      
     {!isRoom && 
      <div className='PostShowDiv '>
          {allPosts?.length > 0 ? <PostShow allPosts={allPosts}  onPostClick={onPostClick} /> : <NoPost/>}
      </div>
      }
      {
        isRoom && 
        <div className="roomShowDiv">
          {/* <div>
              <button className='addRoomButton' onClick={()=>setAddRoom(true)}>Add Room</button>
          </div> */}
          {roomData?.length ==0 ?
          <NoPost /> : 
          <Rooms roomData={roomData}/>
          }
         
      </div>
      }
       
        {isOpenProfileModal &&
         <div className='ProfileModal '>
           <ProfileModal modalData={modalData} closeModal={setIsOpenProfileModal}/>
       </div>
       }
       {
        isAddRoom && 
        <div className='addRoomModal'>
            <AddRooms  closeModal={setAddRoom} />
        </div>
       }
    </div>
  )
}

export default OtherProfileMain
