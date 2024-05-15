import React from 'react'
import { useTypedSelector } from '../../redux/reduxUseSelector';
import NavBarDesk from '../../components/Home/subHomeComponents/NaveBarDesk/NavBarDesk';
import ChatApp from '../../components/MessagesComponent/ChatAPP';

const Messages :React.FC <{}>=() =>{
  const isDarkModeOn = useTypedSelector((state) => state.darkTheme.isDarkTheme);

  return (
    <div className={`flex  ${isDarkModeOn ? "bg-black text-white" : "bg-white "}`}>
        <div className=''>
            <NavBarDesk />
        </div>
        <div>
              <ChatApp />
        </div>
    </div>
  )
}

export default Messages
