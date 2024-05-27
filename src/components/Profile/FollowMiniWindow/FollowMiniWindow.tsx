import { useEffect, useState } from "react";
import { cancelFollReqAPI, checkIsFollwoedAPI, followRequestAPI, unFollowAPI } from "../../../APIs/followAPI";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
 interface widnowProps {
    Profile: string;
    Name: string;
    isProperty: boolean;
    id: string;
}
const FollowMiniWindow:React.FC <widnowProps &{isFollowing:boolean,handleClose:()=>void}>=(props)=> {
    const [isRequested,setIsRequested] = useState<boolean>(false)
    const [isFollwoed,setIsFollowed] = useState<boolean>(false)
    const userId = localStorage.getItem('userId')
    const currentUserType = localStorage.getItem('userType')
    const notifySuccess = (message:string) => toast.success(message,{
        position:"top-center",
        autoClose:1000,
        hideProgressBar:true,
        onClose:()=>props.handleClose()
       });

       const handleFollowRequest = async()=>{
        try {
          const followUserType = props.isProperty ? 'property':'user'
          const follwo_Req_Res = await followRequestAPI(userId,currentUserType,props.id,followUserType) 
          if(follwo_Req_Res.data.success){
            setIsRequested(true)
          }
        } catch (error) {
          console.log('handle follow request error:',error);
        }
      }
    const handleUnfollow = async ()=>{
        try {
          const followUserType = props.isProperty ? 'property':'user'
          const unFollowRep = await unFollowAPI(userId,props.id,followUserType)
          console.log(unFollowRep);
          if(unFollowRep.data.success){
            setIsFollowed(false)
            notifySuccess(`You unfollowed ${props.Name}`)
          }
          
        } catch (error) {
          console.log('hanle unfollow error in ProfileTop',error);
           
        }
      }

      const handleCancellRequest = async ()=>{
        try {
          const res = await cancelFollReqAPI(userId,props.id)
          if(res.data.success){
            setIsRequested(false)
          }
        } catch (error) {
          console.log('handleCancelRequest error in profiletop page',error);
          
        }
      }

      useEffect(() => {
   
          async function checkIsFollowed() {
            const Res = await checkIsFollwoedAPI(userId, props.id, props.isProperty);
            if (Res.data.success) {
              console.log('check is followed :',Res.data);
                  if(Res.data.isAccepted){
                  setIsFollowed(true);
                  }else{
                    setIsRequested(true)
                  }
            }else{
              console.log('set is followed is flse');
              
              setIsFollowed(false);
              setIsRequested(false)
            }
          }
          checkIsFollowed();
          
        
      }, [userId, props.id, props.isProperty]);
    return (
        <div className=" py-2  bg-black rounded-md  flex gap-3 items-center ">
            <div><ToastContainer/></div>
            <div>
                <img
                    className="rounded-full "
                    style={{ width: "50px", height: "50px" }}
                    src={props?.Profile}
                    alt=""
                />
            </div>
            <div className=" flex items-center justify-between w-full">
            <Link to={`/OthersProfile/${props && props.id}/${props && props.isProperty}`}  >
               <div>
               <div>{props?.Name}</div>
                {props?.isProperty && <div className="text-xs ">Property</div>}
               </div>
               </Link>
              {props.isFollowing &&  <h1 onClick={()=>handleUnfollow()} className="text-green-600 cursor-pointer mr-2 mb-3">Unfollow</h1>}
              {!props.isFollowing && isFollwoed && <h1 onClick={handleUnfollow} className="text-green-600 cursor-pointer mr-2 mb-3">Unfollow</h1>}
              {!props.isFollowing && !isFollwoed && !isRequested && <h1 onClick={handleFollowRequest} className="text-green-600 cursor-pointer mr-2 mb-3">Follow</h1>}
              {!props.isFollowing && isRequested && <h1 onClick={handleCancellRequest} className="text-green-600 cursor-pointer mr-2 mb-3">Cancel Request</h1>}
            </div>
        </div>
    );
}

export default FollowMiniWindow;
