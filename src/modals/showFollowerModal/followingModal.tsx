import React, { useEffect, useState } from "react";
import "./followingModal.css";
import SearchSkeleton from "../../components/skeloton/userSkeleton";
import { fetchFDataAPI } from "../../APIs/followAPI";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../redux/reduxUseSelector";
import FollowMiniWindow from "../../components/Profile/FollowMiniWindow/FollowMiniWindow";

interface ModalProps {
    handleClose: () => void;
    show: boolean;
    data:any
    isFollwoing:boolean
    userId:string|undefined|null
}

interface follData {
    Profile:string,
    Name:string,
    isProperty:boolean,
    id:string
}

const FollowingModal: React.FC<ModalProps> = ({ handleClose, show,isFollwoing,userId }) => {
    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [f_data,setF_Data] = useState<follData[]|[]>()
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    
    useEffect(()=>{
        async function fetchFData (){
            setIsLoading(true)
            const res=await fetchFDataAPI(userId,isFollwoing)
            if(res.data){  
                console.log('follwer or following data:',res.data.followerData);
                setIsLoading(false)
                setF_Data(res.data.followerData)
            } else{
                console.log('no following data ..!');
            }
        }
        fetchFData()
    },[])
    
    const handleMouseEnter = (index: number) => {
        setHoverIndex(index);
    }

    const handleMouseLeave = () => {
        setHoverIndex(null);
    }

    return (
        <div className={showHideClassName}>

            <section className={`modal-main ${isDarkThemeOn ? 'bg-gray-900':''}`}>
                <button className={`modal-Button`} onClick={handleClose}>X</button>
                <div><h1 className={`following_heding`}>{isFollwoing ? 'Followings':'Followers'}</h1></div>
                {isLoading && <div className={`modal_contenet`}><SearchSkeleton /></div>}
                <div>
                    {f_data?.map((data:any, index:number) => (
                        <div key={index}>
                            {data !== null && 
                                      <div
                                      onMouseEnter={() => handleMouseEnter(index)}
                                      onMouseLeave={handleMouseLeave}
                                      className="followModalBody relative z-10 flex items-center gap-3 my-2 p-2 "
                                  >
                                        <div>
                                            <img className="rounded-full " style={{width:'50px',height:'50px'}} src={data?.Profile} alt="" />
                                        </div>
                                        <div className="">
                                            <div>{data?.Name}</div>
                                            {data?.isProperty && <div className="text-xs ">Property</div>}
                                           
                                        </div>
                                        {hoverIndex === index && (
                                            <div className="absolute w-full  left-0 z-50">
                                                <FollowMiniWindow {...data} handleClose={handleClose} isFollowing={isFollwoing}/>
                                            </div>
                                        )}
                                    </div>
                                
                            }
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FollowingModal;
