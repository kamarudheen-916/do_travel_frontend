
import { useState } from 'react';
import './Input.css'
interface Props{
    title?:string;
    type:string;
    value?:string;
    name ?:string;
    id?:string;
    width?:string
    placeholder?:string;
    height?:string;
    multiple?:boolean;
    required ?: boolean;
    errorLabelValue?:string;
    pattern?:string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>; 

}

const Input : React.FC<Props>=(props) =>{
  const [focused,setFocused] =useState(false)
  const handleBlur =()=>{
    setFocused(true)
  }
  const handleFocus = () => {
    if (props.name === 'confirmPassword') {
      setFocused(true);
    }
  };
  return (
    <div  className='Input flex flex-col'>
        <label className='label ' htmlFor="">{props.title}</label>
        <input      
                    className='input w-full'
                    placeholder={props.placeholder}
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    pattern={props.pattern}
                    id={props.id}
                    required ={props.required}
                    multiple={props.type === 'file' ? props.multiple:undefined}
                    style={{ width: props.width ? props.width : '100%', height: props.height ? props.height : '30px' }}
                    onChange={props.onChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    data-focused = {focused.toString()}
        />
        <span  className='errorLabel text-left'>{props.errorLabelValue}</span>               
  </div>
  )
}

export default Input
