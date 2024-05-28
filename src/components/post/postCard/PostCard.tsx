import React, { useEffect, useState } from 'react';
import { ratingData, userPost } from '../../../Interfaces/interfaces';
import './PostCard.css';
import LikeDiv from '../postLikeDiv/likeDiv';
import Comments from '../postComment/Comments';
import { useTypedSelector } from '../../../redux/reduxUseSelector';
import { Link } from 'react-router-dom';
import { isPostLikedAPI, isPostSavedAPI, likePostAPI, savePostAPI, updateRatingAPI } from '../../../APIs/postAPI';
import SharingModal from '../../../modals/sharePostModal/sharePostModal';
import CustomAlert from '../../alerts/customAlerts/CustomAlerts';
import ShowLikesModal from '../../../modals/likesModal/LikesModal';
import PostOptionModal from '../../../modals/PostOptionModal/PostOptionModal';

const PostCard: React.FC<userPost & {closeModal?:React.Dispatch<React.SetStateAction<boolean>>} > = (props) => {
  const isDarkModeOn = useTypedSelector((state) => state.darkTheme.isDarkTheme);
  const [customAlertMessage, setCustomAlertMessage] = useState<string>('');
  const profile: any = localStorage.getItem('userProfile');
  const userName: any = localStorage.getItem('userName');
  const userId: any = localStorage.getItem('userId');
  const [isComment, setIsComment] = useState<boolean>(false);
  const [postData,setPostData] = useState<userPost>(props)
  const [ratingStar, setRatingStar] = useState<number[]>([0,0,0,0,0]);
  const [isSaved,setIsSaved] = useState<boolean>(false)
  const [isLiked,setIsLiked] =useState<boolean>(false)
  const [isShareOpen,setIsShareOpen] = useState<boolean>(false)
  const [isShowLikesOpen,setIsShowLikesOpen] = useState<boolean>(false)
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState<boolean>(false);
  // const [ratings, setRatings] = useState<number>(0);

  useEffect(() => {    
    const rate: ratingData | undefined = props.ratings?.find(item => item.raterId === userId);
    if (rate) {
      const updatedRatings = ratingStar.map((_, index) => (index <= rate.rate-1 ? 1 : 0));
      setRatingStar(updatedRatings)
    }
  }, [props.ratings]);
  

  const handleRatingClick = async (starIndex: number) => {
    const updatedRatings = ratingStar.map((_, index) => (index <= starIndex ? 1 : 0));
    setRatingStar(updatedRatings)
    const res = await updateRatingAPI(props._id, starIndex+1);
    if(res?.data.success){
      // setRatings(starIndex)
      setCustomAlertMessage(res.data.message);
    }else{
      setCustomAlertMessage(res?.data.message);
    }
  };

  const handlePostsave = async ()=>{
    setIsSaved(!isSaved)
    const res = await savePostAPI(props._id,isSaved)
    console.log('handle post save response :',res?.data);
    
    if(res?.data.success){
      setCustomAlertMessage(res.data.message);
    }
  }
  const handlePostLike = async ()=>{
    try {
      setIsLiked(!isLiked)
      const res = await likePostAPI(props._id,isLiked)
      if(res?.data.success){
        setCustomAlertMessage(res.data.message)
      }else{
        setCustomAlertMessage(res?.data.message)
      }
    } catch (error) {
      console.log('handle post like error :',error)
    }
  }
  useEffect(()=>{
    async function checkIsPostSaved (){
    try {
      const res = await isPostSavedAPI(props._id)
      if(res?.data.success){
        setIsSaved(true)
      }else{
        setIsSaved(false)
      }
    } catch (error) {
      console.log('check is post saved error in Post card useEffct :',error );
      
    }
    }
    async function checkIsPostLiked(){
      try {
        const res = await isPostLikedAPI(props._id)
        if(res?.data.success){
          setIsLiked(true)
        }else{
          setIsLiked(false)
        }
      } catch (error) {
      console.log('check is post liked error in Post card useEffct :',error );
        
      }
    }
    checkIsPostSaved()
    checkIsPostLiked()

  },[isSaved])

  return (
    <div className={`postBody ${isDarkModeOn ? 'bg-black' : ''}`}>
        {customAlertMessage && (
        <CustomAlert message={customAlertMessage} onClose={() => setCustomAlertMessage('')} />
      )}
      <div> 
      {isShowLikesOpen && <ShowLikesModal data={props.like} handleClose={()=>setIsShowLikesOpen(false)} postId={props._id}/>}
      {isShareOpen &&  <SharingModal  handleClose={()=>setIsShareOpen(false)} userId={userId} />}
      </div>
      <div className="">
        <div className="">
          <div className="topDiv flex justify-between items-center mt-5 mb-3">
           <Link to={`/OthersProfile/${props && props.userId}/${props && props.isProperty}`}>
           <div className="profileAndName flex items-center  ">
              <div className="profileImageOnHome">
                {profile === '' ? (
                  <i className="fa-solid fa-user" style={{ fontSize: '30px' }}></i>
                ) : (
                  <img src={props.PostProfile} alt="" />
                )}
              </div>
              <div className="profileAndName font-medium ml-3">
                <h1>{props.PostName}</h1>
              </div>
            </div>
           </Link>
           <div className='flex gap-5  '>
                {props.isProperty && <Link to={`/OthersProfile/${props && props.userId}/${props && props.isProperty}`}>
                    <button className='bg-green-800 text-white px-3 rounded-sm'>Book your stay</button>
                </Link> }
                <div className='font-extrabold '>
                  <p className='text-green-700 cursor-pointer' onClick={()=>setIsDeletePopupVisible(true)}>•••</p>
                 <div>
                  {isDeletePopupVisible && <PostOptionModal onDeleteRefresh={props.closeModal} postUserId={props.userId} postId={props._id} handleClose={setIsDeletePopupVisible}/>}
                 </div>
                </div>
           </div>
          
          </div>
          <div className="postCardImage ">
            <img src={props.post} alt="" />
          </div>
          <div>
            <LikeDiv 
            setIsShowLikesOpen={()=>setIsShowLikesOpen(!isShowLikesOpen)}
            numberOfComments={props.comments.length}
            numberOfLikes={props.like.length}
            handlePostLike={handlePostLike}
            setIsShareOpen={setIsShareOpen}
            handlePostSave={handlePostsave}
            setIsSaved={setIsSaved}
            isSaved={isSaved}
            isLiked={isLiked}
            isComment={isComment} 
            setIsComment={setIsComment} />
          </div>
          <div className={`comments_Component ${isComment ? 'active' : ''}`}>
            <Comments 
            postId={postData._id} 
            comments={postData.comments} 
            setPostData={setPostData} 
            profile={profile} 
            userName={userName} />
          </div>
          <div className="PostCardDescription">
            <h1>{props.description} </h1>
          </div>
          {props.isProperty && <div className="ratingDiv mt-4 flex justify-between items-center px-2">
            <div className="text-green-600">
              {[...Array(5)].map((_, starIndex) => (
                <i
                  key={starIndex}
                  className={`fa-star cursor-pointer ${ratingStar[starIndex] ? 'fa-solid' : 'fa-regular'}`}
                  onClick={() => handleRatingClick(starIndex)}
                ></i>
              ))}
            </div>
            <div className="text-green-600">
              <Link to={''}>Chat With Resort</Link>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default PostCard;