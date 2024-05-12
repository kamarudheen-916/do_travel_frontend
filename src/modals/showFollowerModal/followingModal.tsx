import React, { useEffect, useState } from "react";
import "./followingModal.css";
import SearchSkeleton from "../../components/skeloton/userSkeleton";
import { fetchFDataAPI } from "../../APIs/followAPI";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../redux/reduxUseSelector";

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
                                <Link to={`/OthersProfile/${data && data.id}/${data && data.isProperty}`}  key={index}>
                                    <div className="followModalBody flex items-center gap-3 my-2 p-2 hover:bg-green-800 hover:bg-opacity-50 ">
                                        <div>
                                            <img className="rounded-full " style={{width:'50px',height:'50px'}} src={data?.Profile} alt="" />
                                        </div>
                                        <div>
                                            <div>{data?.Name}</div>
                                            {data?.isProperty && <div className="text-xs ">Property</div>}
                                        </div>
                                    </div>
                                </Link>
                            }
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FollowingModal;
