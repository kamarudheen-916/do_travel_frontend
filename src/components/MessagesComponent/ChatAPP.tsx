import { useEffect, useRef, useState } from "react";
import ChatBar from "../Chats/ChatBar/ChatBar";
import './ChatApp.css';
import { io, Socket } from 'socket.io-client';
import ChatFooter from "../Chats/ChatFooter/ChatFooter";
import ChatBody from "../Chats/ChatBody/ChatBody";
import { getMessageAPI } from "../../APIs/ChatAPI";
import { useNavigate } from "react-router-dom";
import notificationSound from '../../../public/sounds/Iphone Message Tone Download - MobCup.Com.Co.mp3'
import { useDispatch } from "react-redux";
interface onlineUser {
  [userId: string]: string;
}

const ChatAPP: React.FC = () => {
  const Dispatch = useDispatch()
  const navigate = useNavigate();
  const Navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUser, setOnlinUser] = useState<onlineUser>();
  const [messages, setMessages] = useState<any[]>([]);
  const [typingStatus, setTypingStatus] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>();
  const [selectedUserProfile, setSelectedUserProfile] = useState<string | null>();
  const [selectedUserName, setSelectedUserName] = useState<string | null>();
  const userId = localStorage.getItem('userId');
  const lastMessageRef = useRef<any>(null);

  const getMessage = async () => {
  try {
    if (selectedUser) {
      const res = await getMessageAPI(selectedUser);
      console.log('messages ', res);
      setMessages(res?.data);
    }
  }catch (error:any) {
    if (error.response && error.response.data) {
      if (
        error.response.status === 401 &&
        error.response.data.message === "User is blocked !!"
      ) {
        localStorage.removeItem("token");
        Dispatch({ type: "logout", payload: null });
     
      }
    }
  }
  };

  useEffect(() => {
    getMessage();
  }, [selectedUser, setMessages]);

  useEffect(() => {
    if (userId) {
      const socket: Socket = io('http://localhost:3000', {
        query: { userId }
      });
      setSocket(socket);
      socket.on('getOnlineUsers', (users) => { setOnlinUser(users); });

      return () => { socket.close(); };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userId]);

  useEffect(() => {
    
    socket?.on('newMessage', (newMessage) => {
      const sound = new Audio(notificationSound)
      sound.play()
      setMessages((prevMessages) => [...prevMessages, newMessage])
    });
    
    return ()=> {socket?.off('newMessage')}
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (message: any) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="chat">
      <ChatBar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setSelectedUserProfile={setSelectedUserProfile}
        setSelectedUserName={setSelectedUserName}
        onlineUsers={onlineUser}
      />
      <div className="w-full">
        <ChatBody
          selectedUser={selectedUser}
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
          selectedUserProfile={selectedUserProfile}
          selectedUserName={selectedUserName}
        />
        {selectedUser && (
          <ChatFooter
            recipientId={selectedUser}
            addMessage={addMessage} // Pass the addMessage function as a prop
          />
        )}
      </div>
    </div>
  );
};

export default ChatAPP;
