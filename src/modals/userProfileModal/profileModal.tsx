import { userPost } from "../../Interfaces/interfaces";
import PostCard from "../../components/postCard/PostCard";
import "./profileModal.css";
interface profileModalProps {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: userPost[] | undefined;
}

const profileModal: React.FC<profileModalProps> = (props) => {
  return (
    <>
      <div className="ProfileModalOverly text-red"></div>
      <div className="P_modal">
        <div className="closeButton ">
          {/* <div></div> */}
          <span onClick={() => props.closeModal(false)}>X</span>
        </div>
        {props.modalData && props.modalData.length > 0 && (
          <div className="modal_body " >
           { props.modalData.map((post,index)=>(
             <PostCard key={index} {...post}/>
           ))
          }
          </div>
        )}
      </div>
    </>
  );
};

export default profileModal;
