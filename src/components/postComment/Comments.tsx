import { useEffect, useState } from "react";
import "./Comments.css";
import { FiSend } from "react-icons/fi";

import { comments, userPost } from "../../Interfaces/interfaces";
import { submitCommentAPI } from "../../APIs/postAPI";
import Loading from "../Loading/Loading";
interface commentProps {
  profile: any;
  userName: string | null;
  comments: comments[];
  postId:string;
  setPostData:React.Dispatch<React.SetStateAction<userPost>>

}
const Comments: React.FC<commentProps> = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
  const [comment, setComment] = useState("");
  const submitComment = async()=>{
    if(comment === ''){
      return
    }else{
      setIsSubmitting(true);
      const res = await submitCommentAPI(comment,props.postId)
    if(res?.data.success){
        props.setPostData(prev=>({
          ...prev,
          comments:[...res.data.res.comments]
        }))
        setComment('')
    }else{
        console.log(res?.data.message);
    }
    setIsSubmitting(false);
    }
  }
  return (
    <div className="">
      
        <div className="Comment_div">
          <div className="commentInput">
            <input 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              name=""
              className="w-full "
              id=""
            />
        
              isSubmitting ?
               <Loading /> 
              
               <FiSend className="sendCommentIcon" onClick={submitComment} />

          
            {/* <FiSend className="sendCommentIcon" onClick={submitComment} /> */}
            
          </div>
          {/* <div>{isSubmitting && <div><Loading /></div>} </div> */}
          <div className="EachComment">
            {props.comments.length === 0 ? (
              <h1>No Comments</h1>
            ) : (
              <>
                {props.comments.map((comment, index) => (
                  <div key={index} className="">
                    <div className="comment_profile">
                      <img src={props.profile} alt="profile" />
                      <h1>{props.userName}</h1>
                    </div>
                    <div className="comments">
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
   
    </div>
  );
};

export default Comments;
