
import './DropDown.css'
interface DropdownProps {
    options:string[];
    label:string;
    name:string;
    onSelect : React.ChangeEventHandler<HTMLSelectElement>;
    required:boolean;
    value:string

}

const DropDown: React.FC<DropdownProps>=({options,onSelect,label,name,required,value}) =>{


  return (
    <div className="mb-2.5 text-start">
        <label htmlFor="" className="label">{label}</label>
        <select required={required} name={name} value={value} className="rounded dropDownSelect bg-gray-300" onChange={onSelect} style={{width:'100%'}}>
                <option value="">Select...</option>
                {
                    options.map((option,index)=>(
                        <option key={index} value={option}>{option}</option>   
                    ))
                }
        </select>
    </div>
  )
}

export default DropDown
