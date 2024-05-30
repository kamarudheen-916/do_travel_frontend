
interface props {
  setIsComment: React.Dispatch<React.SetStateAction<any>>;
  isComment:boolean
  setIsSaved:React.Dispatch<React.SetStateAction<boolean>>;
  isSaved:boolean;
  isLiked:boolean;
  handlePostSave:()=>void
  handlePostLike:()=>void
  setIsShareOpen:React.Dispatch<React.SetStateAction<boolean>>;
  numberOfLikes:number;
  numberOfComments:number;
  setIsShowLikesOpen:()=>void
}
const  LikeDiv : React.FC<props>=(props) =>{  
  return (
    <div className="likeDiv flex justify-between mt-1">
                  <div className="likeCommentShare flex w-fit  gap-2 text-center">
                    <div>
                      <i onClick={props.handlePostLike} className={`${props.isLiked ? 'fa-solid':'fa-regular'} fa-heart text-xl text-green-700`}></i>
                      <p onClick={props.setIsShowLikesOpen} className="text-xs font-bold text-green-600 cursor-pointer">{props.numberOfLikes} Likes</p>
                    </div>
                    <div>
                      <i onClick={()=>props.setIsComment(!props.isComment)} className={`fa-regular fa-comment text-xl text-green-700`}></i>
                      <p className="text-xs font-bold text-green-600">{props.numberOfComments} Comments</p>
                    </div>
                    {/* <div>
                      <i onClick={()=>props.setIsShareOpen(true)} className="fa-regular fa-paper-plane text-xl text-green-700"></i>
                    </div> */}
                  </div>
                  <div className="save">
                    <div>
                      <i onClick={props.handlePostSave} className={`${props.isSaved ? 'fa-solid':'fa-regular'} fa-bookmark text-xl text-green-700`}></i>
                    </div>
                  </div>
     </div>
  )
}

export default LikeDiv
