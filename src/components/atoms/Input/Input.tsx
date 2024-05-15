
import { useState } from 'react';
import './Input.css'
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from '../../../redux/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

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
  const isDarkModeOn = useTypedSelector((state) => state.darkTheme.isDarkTheme);
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
                    className={`input w-full bg-gray-300 placeholder:text-gray-600 rounded text-black focus:outline-none p-3`}
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
