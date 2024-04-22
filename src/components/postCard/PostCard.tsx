import React, { useState } from 'react'
import { userPost } from '../../Interfaces/interfaces'
import './PostCard.css'
import LikeDiv from '../postLikeDiv/likeDiv'
import Comments from '../postComment/Comments'
// import { Link } from 'react-router-dom'
const PostCard : React.FC<userPost> =(props)=> {

    const userName = localStorage.getItem('userName')
    const profile : any= localStorage.getItem('userProfile')
    const [isComment,setIsComment] = useState<boolean>(false)
    const [postData,setPostData] = useState<userPost>(props)
  return (
    <div className='postBody' >
         <div className=" ">
              <div  className=" ">
              <div className="topDiv flex justify-between items-center mt-5 mb-3">
                  <div className="profileAndName flex items-center  ml-3">
                    <div className="profileImageOnHome">
                      <img src={profile} alt="" />
                    </div>
                    <div className="profileAndName font-medium ml-3">
                      <h1>{userName}</h1>
                    </div>
                  </div>
                  {/* <div>
                    <button className="BookNowButton bg-stone-400">
                      Book Now
                    </button>
                  </div> */}
                </div>
                <div className="postCardImage rounded">
                  <img src={props.post} alt="" />
                </div>
                <div >
                    <LikeDiv isComment={isComment} setIsComment={setIsComment} />
                </div>
                <div className={`comments_Component ${isComment ? 'active' : ''}`}>
                   <Comments postId = {postData._id} comments={postData.comments} setPostData={setPostData} profile={profile} userName={userName} />
                </div>
                <div className="PostCardDescription">
                  <h1>{props.description} </h1>
                </div>
                {/* <div className="ratingDiv mt-4 flex justify-between">
                  <div className="Rating bg-stone-400">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                  </div>
                  <div>
                    <Link className="pb-1 px-3 rounded bg-stone-400" to={""}>
                      Chat With Resort
                    </Link>
                  </div>
                </div> */}
              </div>
          
         
        </div>
    </div>
  )
}

export default PostCard
