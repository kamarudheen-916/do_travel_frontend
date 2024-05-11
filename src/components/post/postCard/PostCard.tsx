import React, { useEffect, useState } from 'react';
import { ratingData, userPost } from '../../../Interfaces/interfaces';
import './PostCard.css';
import LikeDiv from '../postLikeDiv/likeDiv';
import Comments from '../postComment/Comments';
import { useTypedSelector } from '../../../redux/reduxUseSelector';
import { Link } from 'react-router-dom';
import { updateRatingAPI } from '../../../APIs/postAPI';

const PostCard: React.FC<userPost > = (props) => {
  const isDarkModeOn = useTypedSelector((state) => state.darkTheme.isDarkTheme);
  const profile: any = localStorage.getItem('userProfile');
  const userName: any = localStorage.getItem('userName');
  const userId: any = localStorage.getItem('userId');
  const [isComment, setIsComment] = useState<boolean>(false);
  const [postData,setPostData] = useState<userPost>(props)
  const [ratingStar, setRatingStar] = useState<number[]>([0,0,0,0,0]);
  const [ratings, setRatings] = useState<number>(0);

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
      setRatings(starIndex)
      alert(res.data.message)
    }else{
      alert(res?.data.message)
    }
  };

  return (
    <div className={`postBody ${isDarkModeOn ? 'bg-black' : ''}`}>
      <div className="">
        <div className="">
          <div className="topDiv flex justify-between items-center mt-5 mb-3">
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
          </div>
          <div className="postCardImage ">
            <img src={props.post} alt="" />
          </div>
          <div>
            <LikeDiv isComment={isComment} setIsComment={setIsComment} />
          </div>
          <div className={`comments_Component ${isComment ? 'active' : ''}`}>
            <Comments postId={postData._id} comments={postData.comments} setPostData={setPostData} profile={profile} userName={userName} />
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
