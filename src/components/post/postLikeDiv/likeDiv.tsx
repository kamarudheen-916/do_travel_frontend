
interface props {
  setIsComment: React.Dispatch<React.SetStateAction<any>>;
  isComment:boolean
}
const  LikeDiv : React.FC<props>=(props) =>{
  return (
    <div className="likeDiv flex justify-between mt-1">
                  <div className="likeCommentShare flex w-24 justify-between">
                    <div>
                      <i className="fa-regular fa-heart text-xl text-green-700"></i>
                    </div>
                    <div>
                      <i onClick={()=>props.setIsComment(!props.isComment)} className="fa-regular fa-comment text-xl text-green-700"></i>
                    </div>
                    <div>
                      <i className="fa-regular fa-paper-plane text-xl text-green-700"></i>
                    </div>
                  </div>
                  <div className="save">
                    <div>
                      <i className="fa-regular fa-bookmark text-xl text-green-700"></i>
                    </div>
                  </div>
     </div>
  )
}

export default LikeDiv
