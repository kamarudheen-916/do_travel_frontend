import { userPost } from "../../Interfaces/interfaces";
import PostCard from "../../components/post/postCard/PostCard";
import { useTypedSelector } from "../../redux/reduxUseSelector";
import "./profileModal.css";
interface profileModalProps {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: userPost[] | undefined;
}

const profileModal: React.FC<profileModalProps> = (props) => {
  const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)

  return (
    <>
      <div className="ProfileModalOverly text-red"></div>
      <div className="P_modal">
        <div className="closeButton ">
          <span onClick={() => props.closeModal(false)}>X</span>
        </div>
        {props.modalData && props.modalData.length > 0 && (
          <div className={`modal_body ${isDarkThemeOn ? 'bg-black':''} `} >
           { props.modalData.map((post,index)=>(
             <PostCard key={index} {...post} closeModal={props.closeModal}/>
           ))
          }
          </div>
        )}
      </div>
    </>
  );
};

export default profileModal;
