import { JSX } from "react"
import './Naves.css'
interface props{
    icon : JSX.Element 
    iconName?:string
    onClick?:()=>void
}
const  Naves : React.FC<props>=(props) =>{
  return (
    <div onClick={props.onClick}  className="naves flex p-4 items-center  ">
            <div >{props.icon}</div>
            {props.iconName && <div id="nav_iconName" className="text-md  ml-3 font-bold ">
              <h1 className="overflow-hidden">{props.iconName}</h1>
            </div>}
     </div>
  )
}

export default Naves
