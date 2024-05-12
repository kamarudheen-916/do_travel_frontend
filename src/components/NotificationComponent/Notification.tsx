import React, { useState } from 'react'
import { NotificationData } from '../../Interfaces/interfaces'
import { cancelFollReqAPI, confirmFollReqAPI } from '../../APIs/followAPI'

const  Notification:React.FC<{data:NotificationData,isDarkModeOn:boolean}>=(props)=> {
    const userId = localStorage.getItem('userId')
    const [isReqConfirmed,setIsReqConfirmed] =  useState<boolean|null>(null)
    const [isReqCancelled,setIsReqCancelled] =  useState<boolean|null>(null)
    const handleConfirmFollReq =async (followerId:string) =>{
        try {
          const Res = await confirmFollReqAPI(followerId,userId)
          if(Res.data.success){
            setIsReqConfirmed(true)
          }
         
        } catch (error) {
          console.log('hadle confirm follow request error :',error);
          
        }
      }
    
      const handleCancellFollReq =async (followerId:string) =>{
        try {
          const Res = await cancelFollReqAPI(followerId,userId)
          console.log('handleCancellFollReq :',Res);
          if(Res.data.success){
            setIsReqCancelled(true)
          }
        } catch (error) {
          console.log('hadle confirm follow request error :',error);
          
        }
      }
  return (
    <div>
         <div  className="flex gap-1">
           <div className="userProfileImage" >
             <img src={props.data.notificationProfile} alt="" />
           </div>
           <div className="userProfileName gap-24">
             <div className="nameDiv">
               <h1 className={`${props.isDarkModeOn ? "text-gray-300" : ""}`}>{props.data.notificationName}</h1>
               {props.data.isProperty && <h1 className="isPropery">Property</h1>}
             </div>
            <div className="flex gap-5 ">
                {!isReqConfirmed &&!isReqCancelled&&  <div className="hover:bg-green-800 cursor-pointer hover:text-white hover:rounded px-2 py-1 text-green-600" onClick={()=>handleConfirmFollReq(props.data.followingId)}>Confirm</div> }
                { isReqConfirmed && <div className="hover:bg-green-800  hover:text-white hover:rounded px-2 py-1 text-green-600" >Confirmed</div> }
                { isReqCancelled && <div className="hover:bg-green-800  hover:text-white hover:rounded px-2 py-1 text-red-600" >Cancelled</div> }
                {!isReqConfirmed && !isReqCancelled&&  <div className="hover:bg-green-800 cursor-pointer hover:text-white hover:rounded px-2 py-1 text-green-600" onClick={()=>handleCancellFollReq(props.data.followingId)}>Cancel</div>}
            </div>
         
           </div>
         </div>
    </div>
  )
}

export default Notification
