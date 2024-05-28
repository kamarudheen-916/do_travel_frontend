import { useEffect, useState } from "react";

import "./showPost.css";
import { findUserPostByIdAPI } from "../../../API_admin/adminAPI";
import AdminPostCard from "../../../componentsAdmin/post/adminPostCard/AdminPostCard";
interface profileModalProps {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string|undefined;
  isDeletedPost:boolean
}

const ShowReportedPost: React.FC<profileModalProps> = (props) => {
  // const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
  const [post,setPost] = useState<any>()

  const findPostById = async()=>{
    try {
      const res = await findUserPostByIdAPI(props.postId,props.isDeletedPost)
      if(res?.data.success){
        setPost(res.data.data)
        console.log('post data :',res.data.data); 
      }else{
        console.log('error post :',res?.data.message);
        
      }
    } catch (error) {
      console.log('find post in admin side ',error);
      
    }
  }

  useEffect(()=>{
    findPostById()
  },[])
  return (
    <>
      <div onClick={()=>props.closeModal(false)} className="ProfileModalOverly text-red"></div>
      <div className={`post_modal  bg-gray-800 ${props.isDeletedPost ? 'isDeleted':''}`}>
        <div className="closeButton ">
          <span onClick={() => props.closeModal(false)}>X</span>
        </div>
       
          <div onClick={(e) => e.stopPropagation()} className={`modal_body `} >
    
           {post  &&  <AdminPostCard  {...post} isDeletedPost={props.isDeletedPost} closeModal={props.closeModal}/>}

          
          </div>

      </div>
    </>
  );
};

export default ShowReportedPost;
