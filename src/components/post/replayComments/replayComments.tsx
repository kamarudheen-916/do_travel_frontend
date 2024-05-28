import {  useState } from "react";
import "./replayComments.css";
import { FiSend } from "react-icons/fi";
import { ReplayCommentsInterface, userPost } from "../../../Interfaces/interfaces";
// import { deleteCommentAPI, editCommentAPI, submitCommentAPI } from "../../../APIs/postAPI";
import Loading from "../../Loading/Loading";
import LineLoader from "../../Loading/LineLoader/LineLoader";
// import { ToastContainer,toast } from "react-toastify";
import { useTypedSelector } from "../../../redux/reduxUseSelector";
import { replayCommentAPI } from "../../../APIs/postAPI";


interface commentProps {
  comments?: ReplayCommentsInterface[]|any;
  postId: string | undefined;
  setPostData: React.Dispatch<React.SetStateAction<userPost>>;
  replayableCommentId:string|undefined
  
}
const ReplayComments: React.FC<commentProps> = (props) => {

  const isDarkModeOn = useTypedSelector((state) => state.darkTheme.isDarkTheme);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  // const [deleteCommentIndex, setDeleteCommentIndex] = useState<number | null>(null);
  // const [editCommentIndex,setEditCommentIndex] = useState<number|null>(null)
  // const [replayCommentIndex,setReplayCommentIndex] = useState<number|null>(null)
  // const [comment, setComment] = useState("");
  const [isLoading,setIsLoading]= useState(false)
  // const [editComment,setEditComment] = useState<string>('')
  const [replayCommentText,setReplayCommentText] = useState<string>('')
  // const [editableComment,setEditableComment] = useState<ReplayCommentsInterface>()
  const [reversedComments,setReversedComments] = useState<ReplayCommentsInterface[]>([...props?.comments].reverse())
  
  //  const notifyError = (message:any) => toast.error(message,{
  //    position:"top-center",
  //    autoClose:1000,
  //    hideProgressBar:true
  //   });

  // const onEditComment = async (comment:string) => {
  //   setEditComment(comment)
  // }

  const submitReplayComment = async () => {    
    if (replayCommentText === '') {
      return;
    } else {
      setIsSubmitting(true);
      const res = await replayCommentAPI(props.postId, props.replayableCommentId, replayCommentText);
      setIsLoading(true);
      
      if (res?.data.success) {
        setIsLoading(false);
        console.log('Response from backend:', res.data);
        
  
        const updatedReplayComments = res.data.replayComments;
        
   

        setReversedComments(updatedReplayComments)
  
      
      } else {
        setIsLoading(false);
      }
      
      setIsSubmitting(false);
    }
  };
  
  
  // const deleteComment = async (comment: ReplayCommentsInterface,index:number) => {
  //   const res = await deleteCommentAPI(props.postId,comment._id,index)
  //   if(res?.data.success){
  //     setDeleteCommentIndex(null); // Close delete box
  //     props.setPostData(res.data.post)
  //   }else{
  //     notifyError(res?.data.message)
  //     setDeleteCommentIndex(null);
  //   }

  // };
  // const editCommentSubmit = async(editedComment:string) =>{
  //   if(editedComment === '') return
  //   const res = await editCommentAPI(props.postId,editableComment?._id,editedComment)
  //   if(res?.data.success){
  //     props.setPostData(res?.data.post)
     
  //     setEditCommentIndex(null)
  //   }else{
  //     notifyError(res?.data.message)
  //   }
  // }

//   const replayCommentSubmit = async(replayComment:string,replayCommentId:any) =>{
//     if(replayCommentText === '') return
//     const res = await replayCommentAPI(props.postId,props.replayableCommentId,replayCommentText)
//     if(res?.data.success){
//       console.log('resoponse of replay comment : ',res.data.post);
      
//       props.setPostData(res?.data.post)
     
//       setEditCommentIndex(null)
//     }else{
//       notifyError(res?.data.message)
//     }
//   }
  return (
    <div className={`${isDarkModeOn ? 'bg-gray-800':'bg-comment'} rounded-md`}>
    {/* <ToastContainer /> */}
      {isLoading && <LineLoader />}
      <div className="Comment_div">
        <div className="commentInput">
          <input
            placeholder="Your replay comments..!"
            value={replayCommentText}
            onChange={(e) => setReplayCommentText(e.target.value)}
            type="text"
            name=""
            className="w-full text-black"
            id=""
          />
          {isSubmitting ? (
            <Loading />
          ) : (
            <FiSend className="sendCommentIcon " color="#178834" onClick={submitReplayComment} />
          )}
        </div>
        <div className="EachComment">
          {props.comments.length === 0 ? (
            <h1>No Comments</h1>
          ) : (
            <>
              {reversedComments.map((comment, index) => (
                <div key={index} className="">
                  <div className="comment_profile">
                    {comment.comenterProfile !== "" ? (
                      <img src={comment.comenterProfile} alt="profile" />
                    ) : (
                      <i
                        className="fa-solid fa-user"
                        style={{ fontSize: "15px", marginTop: "2px" }}
                      ></i>
                    )}
                    <h1>{comment.comenterName}</h1>
                  </div>
                  <div className="comments">
                    <div className="flex justify-between">
                      <p>{comment.comment}</p>
                      <p>{new Date(comment.commentTime).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-3 font-bold text-gray-500 cursor-pointer">
                      {/* <div className="deleteComment">
                        <button
                          data-ripple-light="true"
                          data-popover-target="popover"
                          className="text-center font-sans text-xs font-bold text-gray-500"
                          onClick={() => setDeleteCommentIndex(index)}
                        >
                          Delete
                        </button>
                        {deleteCommentIndex === index && (
                          <div
                            data-popover="popover"
                            className="absolute gap-3 p-2 mt-5 text-sm font-normal break-words whitespace-normal border rounded-lg shadow-lg w-max border-red-400 bg-white"
                          >
                            <h1>Do you want to delete the comment?</h1>
                            <div className="flex gap-3 ">
                              <h1
                                className="hover:scale-105"
                                onClick={() => deleteComment(comment, index)}
                              >
                                Yes
                              </h1>
                              <h1
                                className="hover:scale-105"
                                onClick={() => setDeleteCommentIndex(null)}
                              >
                                No
                              </h1>
                            </div>
                          </div>
                        )}
                      </div> */}
                      {/* <div className="editComment relative">
                        <h1
                          onClick={() => {
                            onEditComment(comment.comment);
                            setEditableComment(comment);
                            setEditCommentIndex(editCommentIndex === null ? index : null)
                          }}
                        >
                          Edit
                        </h1>
                        {editCommentIndex === index && ( // Conditionally render EditComment component based on openEditComment state
                         <div className="flex gap-3 ">
                           <input value={editComment} onChange={(e) => setEditComment(e.target.value)} type="text" />
                           <div className="flex gap-3">
                            <h1 onClick={()=>editCommentSubmit(editComment)}>submit</h1>
                            <h1 onClick={()=>setEditCommentIndex(null)}>X</h1>
                           </div>
                         </div>
                      )}
                      </div> */}
                      {/* <div className="relative">
                        <h1 onClick={()=>{
                          setReplayCommentIndex(replayCommentIndex === null ? index : null)
                          }}>Replay</h1>
                        {replayCommentIndex === index && ( // Conditionally render EditComment component based on openEditComment state
                         <div className="flex gap-3 ">
                           <input placeholder="Your replay.." onChange={(e) => setReplayCommentText(e.target.value)} type="text" />
                           <div className="flex gap-3">
                            <h1 onClick={()=>replayCommentSubmit(replayCommentText,comment._id)}>submit</h1>
                            <h1 onClick={()=>setReplayCommentIndex(null)}>X</h1>
                           </div>
                         </div>
                      )}
                      </div> */}
                    </div>
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

export default ReplayComments;
