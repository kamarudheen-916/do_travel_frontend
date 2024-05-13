
import "./ShowRoomDetailsModal.css";

import { useTypedSelector } from "../../redux/reduxUseSelector";

interface ModalProps {
    handleClose: () => void;

}


const ShowRoomDetailsModal: React.FC<ModalProps> = ({ handleClose }) => {
    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
       
    return (
        <div className={'roomDetailesModal'}>
            <section className={`roomDetailesModal-main ${isDarkThemeOn ? 'bg-gray-900':''}`}>
                <button className={`roomDetailesModal-Button`} onClick={handleClose}>X</button>
                <div><h1 className={`following_heding`}>Room Details</h1></div>
                <div className="roomDetaileBody">body</div>
            </section>
        </div>
    );
};

export default ShowRoomDetailsModal;
