import React, { useState } from 'react';
import { sendMessageAPI } from '../../../APIs/ChatAPI';

interface chatProps {
  recipientId: string | null | undefined;
  addMessage: (message: any) => void; // Add the addMessage prop
}

const ChatFooter: React.FC<chatProps> = ({ 
  recipientId, 
  addMessage // Destructure the addMessage prop
}) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      const res = await sendMessageAPI(recipientId, message);
      console.log('send res ', res);

      if (res?.data) {
        addMessage(res.data); // Update the state immediately with the new message
      }
    }
    setMessage('');
  };

  return (
    <div className="chat__footer w-full p-2">
      <form className="form flex justify-between" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message w-full mx-4 rounded px-2 text-black border border-green-500 focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn border border-green-500 hover:bg-green-800 hover:text-white px-2 rounded">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
