
import { useEffect, useState } from 'react';
import NavBarDesk from '../../components/Home/subHomeComponents/NaveBarDesk/NavBarDesk'
import ProfileMain from '../../components/Profile/ProfileMain'
import { getAllPostsAPI } from '../../APIs/UserAPI';
import { userPost } from '../../Interfaces/interfaces';

function Profile() {
  const [allPosts, setAllPosts] = useState<userPost[]>([]);
  const fetchUserPosts = async()=>{
    try {
        const Res = await getAllPostsAPI()
        console.log('fetch user post res:',Res);
        
        if(Res?.data){
          setAllPosts(Res.data.allPost)
        }else {
          throw new Error(Res?.data.message)
        }
    } catch (error) {
      console.log('Fetch user posts error in Profile main component :',error);
    }
  };  
  useEffect(()=>{
        
        fetchUserPosts()
    },[])
  return (
    <div className='flex '>
        <div className='navBar'>
            <NavBarDesk reload={fetchUserPosts} />
        </div>
        <div className='ProfileMain w-full flex justify-center '>
            <ProfileMain  allPosts={allPosts}/>
        </div>
    </div>
  )
}

export default Profile
