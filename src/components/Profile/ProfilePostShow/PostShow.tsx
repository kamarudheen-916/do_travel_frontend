import { userPost } from "../../../Interfaces/interfaces"
import './PostShow.css'
interface postShowProps {
    allPosts :userPost[]
    onPostClick:(post:userPost)=>void
}
const  PostShow:React.FC<postShowProps> =(props) => {
  return (
    <div className='flex flex-wrap p-1 gap-1 postShowDiv' >
    {
      props.allPosts.map((post,index)=>(
       <div key={index} onClick={()=>props.onPostClick(post)} className='postDiv items-center' style={{width:'32.5%',position:'relative'}} >
        <div className='imageDivInProfile w-full h-full max-h-80 '>
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
  )
}

export default PostShow
