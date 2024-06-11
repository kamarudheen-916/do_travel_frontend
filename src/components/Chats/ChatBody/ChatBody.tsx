
import { useNavigate } from 'react-router-dom';
import './ChatBody.css'
import { TiMessages } from "react-icons/ti";

interface chatProps{
    messages:any[]
    lastMessageRef :any
    typingStatus:any
    selectedUser:string|null|undefined
    selectedUserProfile:any
    selectedUserName:any
}
const ChatBody = ({ messages,lastMessageRef,selectedUser,typingStatus,selectedUserName,selectedUserProfile }:chatProps) => {
  const userName = localStorage.getItem('userName')
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  console.log('selected user :',selectedUser);
  
 

  return (
    <div className='chatMainBody flex flex-col justify-between '>
      <header className="chat__mainHeader bg-green-800 text-white px-6 py-3 mb-2 flex items-center justify-between text-xs">
        <button className="leaveChat__btn text-2xl" onClick={handleLeaveChat}>←</button>
        <h1>{selectedUserName}</h1>
        <div className="message__status">
            <p>{typingStatus}</p>
          </div>
      </header>

      <div className="message__container overflow-y-scroll">
        {selectedUser && messages.map((message) =><div key={message._id}>
          {message.senderId === localStorage.getItem('userId') ? (
            <div  className="message__chats flex items-center gap-10 border border-green-700 w-fit pl-1 pr-4 py-1 mx-6 rounded-md" key={message.id}>
                {(localStorage.getItem('userProfile') ) !== '' ? (<img className='w-12 h-12 rounded-full'  src={`${localStorage.getItem('userProfile')}`} alt="" />) : (<i className='text-4xl ml-3 fa-user fa-solid'></i>)}

                {/* <img className='w-12 h-12 rounded-full' src={`${localStorage.getItem('userProfile')}`} alt="" /> */}
            
              <div className="message__sender">
                <p>{message.message}</p>
                <p className='text-gray-700 text-xs'>{message.createdAt.split('T')[1].split('.')[0]}</p>
              </div>
              
            </div>
          ) : (
            <div className="message__chats flex items-center gap-10 border border-green-700 w-fit pl-1 pr-4 py-1 mx-6 rounded-md ml-auto" key={message.id}>
                {(selectedUserProfile ) ? (<img className='w-12 h-12 rounded-full' src={selectedUserProfile} alt="" />) : (<i className='text-4xl ml-3 fa-user fa-solid'></i>)}
                {/* <img className='w-12 h-12 rounded-full' src={selectedUserProfile} alt="" /> */}
              <div className="message__recipient">
                <p>{message.message}</p>
                <p className='text-gray-700 text-xs'>{message.createdAt.split('T')[1].split('.')[0]}</p>
              </div>
            </div>
          )}
          </div>
        )}
        <div ref={lastMessageRef} />
      </div>
      {!selectedUser && <div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {userName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>}

    {messages.length === 0 && selectedUser&& <div className='flex justify-center items-center flex-col '><h1>Send a message to start a conversation</h1> </div>}
    </div>
  );
};

export default ChatBody; 