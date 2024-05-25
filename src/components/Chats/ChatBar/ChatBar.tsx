
import  { useState, useEffect, SetStateAction } from 'react';
import './ChatBar.css'
// import {  Socket } from 'socket.io-client';
import {  getUsersForSidebarAPI } from '../../../APIs/ChatAPI';
import { PropertyFormData, UserFormData } from '../../../Interfaces/interfaces';
interface onlineUser {
  [userId: string]: string;
}
interface chatProps{
    // socket:Socket
    selectedUser:string|null|undefined
    setSelectedUser:React.Dispatch<SetStateAction<string|null|undefined>>
    setSelectedUserName:React.Dispatch<SetStateAction<string|null|undefined>>
    setSelectedUserProfile:React.Dispatch<SetStateAction<string|null|undefined>>
    onlineUsers:any
}
const ChatBar = (props:chatProps) => {
    const [users, setUsers] = useState<UserFormData[]|PropertyFormData[]>([]);
    const [messages,setMessages] = useState()

    // useEffect(() => {
    //     props.socket.on('newUserResponse', (data) => setUsers(data));
    //     console.log(users);
        
    //   }, [props.socket, users]);


      async function getChatUsers (){
        const sideBarUsers = await getUsersForSidebarAPI()
        console.log('Chat users :',sideBarUsers?.data);
        if(sideBarUsers){
          setUsers(sideBarUsers.data)
        }

      }

    useEffect(()=>{
      getChatUsers()
      console.log('online users :',props.onlineUsers);
      
    },[])

    const onUserClick =async(id:string,name:string,profile:string)=>{
      props.setSelectedUser(id)
      props.setSelectedUserName(name)
      props.setSelectedUserProfile(profile)
    }
      return (
        <div className="chat__sidebar border-r border-green-800 h-dvh min-w-60   ">
          {/* <h2 className=''>Open Chat</h2> */}
          <div>
            <h4 className="chat__header text-center py-1 my-5">ACTIVE USERS</h4>
            <div className="chat__users">
              {users.map((user:any,index:number) => (

                <div onClick={()=>onUserClick(user._id,user.firstName||user.PropertyName,user.Profile||user.PropertyProfile)} key={index} className={` mt-1 cursor-pointer  flex items-center justify-between py-2 px-1 ${props.selectedUser===user._id ? "bg-green-800":""}`}>
                   <div className='flex items-center  gap-4'>
                  {(user.Profile && user.PropertyProfile ) !== '' ? (<img className='w-12 h-12 rounded-full' src={user.Profile||user.PropertyProfile} alt="" />) : (<i className='text-4xl ml-3 fa-user fa-solid'></i>)}
                   <div>
                   <p key={user._id}>{user.firstName||user.PropertyName} </p>
                   {user.PropertyProfile && <p className={`text-xs  ${props.selectedUser===user._id ? "text-gray-300":"text-gray-600"}`}>Property</p>}
                   </div>
                   </div>
                    <div>
                  {props.onlineUsers && (props.onlineUsers.includes(user._id) ? ( <span className='text-green-500 text-2xl'>•</span>):( <span className='text-red-500 text-2xl'>•</span>))}
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
};

export default ChatBar;