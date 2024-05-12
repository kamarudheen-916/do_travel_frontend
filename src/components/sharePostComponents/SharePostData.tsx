import React, {  useState } from 'react'
import { Link } from 'react-router-dom'


interface follData {
    Profile:string,
    Name:string,
    isProperty:boolean,
    id:string
}
interface props {
    data :follData
    setSelected: React.Dispatch<React.SetStateAction<follData[]>>


}
const  SharePostData:React.FC<props>=(props)=> {
    const [isSelected,setIsSelected] = useState<boolean>(false)
    const handleSelectSharies = async (isSelc:boolean) => {
        try {
            const checkIsSelected =!isSelc
            setIsSelected(!isSelected);
            
           if(checkIsSelected){
            props.setSelected(prev => [...prev, props.data]);
           }else{
            props.setSelected(prev => prev.filter(item => item.id !== props.data.id));
           }
        } catch (error) {
            console.log('select share post people error:', error);
        }
    }
    
  return (
    <div  className="flex items-center justify-between  hover:bg-green-800 hover:bg-opacity-50">
    <div>
    {props.data !== null && 
             <Link to={`/OthersProfile/${props.data && props.data.id}/${props.data && props.data.isProperty}`}  >
                 <div className="followModalBody flex items-center gap-3 my-2 p-2 ">
                     <div>
                         <img className="rounded-full " style={{width:'50px',height:'50px'}} src={props.data?.Profile} alt="" />
                     </div>
                     <div>
                         <div>{props.data?.Name}</div>
                         {props.data?.isProperty && <div className="text-xs ">Property</div>}
                     </div>
                 </div>
             </Link>
         }
    </div>
    <div>
          <i onClick={()=>handleSelectSharies(isSelected)} className={`${isSelected ? 'fa-solid':'fa-regular'} fa-circle mr-2 cursor-pointer`}></i>
    </div>
         
     </div>
  )
}

export default SharePostData
