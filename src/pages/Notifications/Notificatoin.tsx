import React, { useEffect, useState } from "react";
import NavBarDesk from "../../components/Home/subHomeComponents/NaveBarDesk/NavBarDesk";
import { useTypedSelector } from "../../redux/reduxUseSelector";
import {  fetchFollwerRequestAPI } from "../../APIs/followAPI";
import { NotificationData } from "../../Interfaces/interfaces";
import { useDispatch } from "react-redux";
import { checkCount } from "../../reducers/reducer2";
import Notification from "../../components/NotificationComponent/Notification";
// import { useNavigate } from "react-router-dom";

const Notificatoin: React.FC<{}> = () => {
  const Dispatch = useDispatch()
  // const navigate = useNavigate();

  const isDarkModeOn = useTypedSelector((state) => state.darkTheme.isDarkTheme);

  const userId = localStorage.getItem('userId')
  const [NotificationsData,setNoificationData] = useState<NotificationData[]|[]>([])
  // const [isReqConfirmed,setIsReqConfirmed] =  useState<boolean|null>(null)
  // const [isReqCancelled,setIsReqCancelled] =  useState<boolean|null>(null)
  useEffect(()=>{
    async function fetchFollowRequest(){
          try {
            const Res = await fetchFollwerRequestAPI(userId)
            console.log(Res);
            setNoificationData(Res.data)
            Dispatch(checkCount(Res.data.length))
          } catch (error:any) {
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
      // setIsReqConfirmed(false)
    }
    fetchFollowRequest()
  },[])

  // const handleConfirmFollReq =async (followerId:string) =>{
  //   try {
  //     const Res = await confirmFollReqAPI(followerId,userId)
  //     if(Res.data.success){
  //       setIsReqConfirmed(true)
  //     }
     
  //   } catch (error) {
  //     console.log('hadle confirm follow request error :',error);
      
  //   }
  // }

  // const handleCancellFollReq =async (followerId:string) =>{
  //   try {
  //     const Res = await cancelFollReqAPI(followerId,userId)
  //     console.log('handleCancellFollReq :',Res);
  //     if(Res.data.success){
  //       setIsReqCancelled(true)
  //     }
  //   } catch (error) {
  //     console.log('hadle confirm follow request error :',error);
      
  //   }
  // }
  return (
    <div className={`flex  ${isDarkModeOn ? "bg-black text-white" : "bg-white "}`}>
      <div>
        <NavBarDesk />
      </div>
      <div className="flex flex-col w-full items-center h-fit">
        <div className="bg-green-800 text-white font-extrabold w-full text-center py-1 text-lg">
          <h1>Notifications</h1>
        </div>
        <div>
          <div className="font-extrabold my-5 text-center">
            <h1>Follwo Request</h1>
          </div>
          {
            NotificationsData.length === 0 && (
              <div className="text-center border border-green-600 placeholder py-6 px-12 rounded">
                <p className="mr-2 font-extrabold text-gray-500 text-3xl">There are no notifications</p>
                <i className="fas fa-bell-slash text-gray-500 text-2xl"></i>
              </div>
            )
          }

         { NotificationsData.map((data,index)=>(
          <div key={index}>
              <Notification data={data} isDarkModeOn={isDarkModeOn}  />
          </div>
         )) }
        </div>
      </div>
    </div>
  );
};

export default Notificatoin;
