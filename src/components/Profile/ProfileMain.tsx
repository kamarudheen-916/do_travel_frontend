import './ProfileMain.css'
import { userPost } from '../../Interfaces/interfaces';
import ProfileModal from '../../modals/userProfileModal/profileModal';
import { useState } from 'react';

interface props {
  allPosts:userPost[]
}

const ProfileMain:React.FC<props> = ({allPosts})=> {
  const [isOpenProfileModal,setIsOpenProfileModal] = useState<boolean>(false)
  const [modalData,setModalData] = useState<userPost[]>()
  const userName = localStorage.getItem('userName')
  const porfile:any = localStorage.getItem('userProfile')
  console.log('allPosts',allPosts);
  
  const onPostClick = (post:userPost)=>{
    const datas = allPosts.filter((item)=> item._id !== post._id)
    datas.unshift(post)
    console.log(datas.length);
    setIsOpenProfileModal(true)
    setModalData(datas)
  } 
  return (
    <div className='max-w-4xl min-w-96  h-dvh overflow-y-scroll relative'>
        <div className='profileImg flex gap-24 p-5' >
          <div>
            <img src={porfile} className='rounded-full w-36 ' alt="" />
          </div>
          <div className=''>
              <div className='flex gap-8 userName'>
                <h1 >{userName}</h1>
                <button className='EditProfileButton'>Edit Profile</button>
              </div>
              <div className='flex gap-8 followerDiv'>
                <h1>8 posts</h1>
                <h1>227 followers</h1>
                <h1>37 following</h1>
              </div>
          </div>

        </div>
        <div className='flex flex-wrap  p-1 gap-1' >
          {
            allPosts.map((post,index)=>(
             <div key={index} onClick={()=>onPostClick(post)} className='postDiv' style={{width:'32%',position:'relative'}} >
              <div className='imageDivInProfile w-full h-full '>
               <img  className='w-full' src={post.post} alt="" style={{width:'100%',height:'100%'}} />
              </div>
               <div className='overlay'>
                <span>Likes: {post.like}</span>
                <span>Comments: {post.comments.length}</span>
                </div>
                
             </div>
            ))
          }
        </div>
        {isOpenProfileModal &&
         <div className='ProfileModal '>
                  <ProfileModal modalData={modalData} closeModal={setIsOpenProfileModal}/>
       </div>}
    </div>
  )
}

export default ProfileMain
