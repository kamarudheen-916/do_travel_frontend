import React, { useEffect, useState } from "react";
import "../showFollowerModal/followingModal.css";
import SearchSkeleton from "../../components/skeloton/userSkeleton";
import { fetchFDataAPI } from "../../APIs/followAPI";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../redux/reduxUseSelector";
import SharePostData from "../../components/sharePostComponents/SharePostData";

interface ModalProps {
    handleClose: () => void;
    userId:string|undefined|null
}

interface follData {
    Profile:string,
    Name:string,
    isProperty:boolean,
    id:string
}

const SharingModal: React.FC<ModalProps> = ({ handleClose,userId }) => {
    const isDarkThemeOn = useTypedSelector(state=>state.darkTheme.isDarkTheme)
    const [s_data,setS_Data] = useState<follData[]|[]>()
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const [selected,setSelected] = useState<follData[]>([])
    
    
    useEffect(()=>{
        async function fetchFData (){
            setIsLoading(true)
            const res=await fetchFDataAPI(userId,true)
            if(res.data){  
                console.log('follwer or following data:',res.data.followerData);
                setIsLoading(false)
                setS_Data(res.data.followerData)
            } else{
                console.log('no following data ..!');
            }
        }
        fetchFData()
    },[])
    const removeSelectedItems = (index:number) =>{
        try {
            const items = selected
            items.splice(index,1)
            setSelected([...items])
        } catch (error) {
            console.log('remove selected item form the share array error :',error);
        }
    }
    return (
        <div className='modal'>
            <section className={`modal-main ${isDarkThemeOn ? 'bg-gray-900':''}`}>
                <button className={`modal-Button`} onClick={handleClose}>X</button>
                <div><h1 className={`following_heding`}>Share</h1></div>
                {isLoading && <div className={`modal_contenet`}><SearchSkeleton /></div>}
                <div>
                    <div className="flex gap-2 flex-wrap p-1">
                        {selected.map((item,index)=>(
                            <div className="flex gap-2 items-center bg-slate-500 px-2 rounded-md">
                                <h1 className="text-xs " key={item.id}>{item.Name}</h1>
                                <h1 onClick={()=>removeSelectedItems(index)} className="mb-1 cursor-pointer">x</h1>
                            </div>
                        ))}
                    </div>
                    {s_data?.map((data:any, index:number) => (
                        <div key={index} >
                            <SharePostData setSelected={setSelected} data={data} />      
                        </div>
                    ))}
                    <div className="bg-slate-800 p-2 ">
                        <button onClick={()=>alert('you need to impliment the backend of sharing')} disabled={selected.length === 0} className={`${selected.length === 0 ?'bg-green-950':'bg-green-600'} w-full rounded-md`}>Share</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SharingModal;
