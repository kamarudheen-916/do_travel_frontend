import { JSX, useState } from "react";
import "./Naves.css";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
interface props {
  icon: JSX.Element;
  iconName?: string;
  onClick?: () => void;
  count?:number;
}
const Naves: React.FC<props> = (props) => {

  const isDarkModeOn = useTypedSelector((state) => state.darkTheme.isDarkTheme);
  return (
    <div onClick={props.onClick} className="naves flex p-4  items-center  ">
      <div className="icon">{props.icon}</div>
      {props.iconName && (
        <div id="nav_iconName" className={`relative text-md  ml-3 font-bold ${isDarkModeOn ? 'text-white':''}`}>
          <h1 className="overflow-hidden">{props.iconName}</h1>
        </div>
      )}
       {props.iconName === 'Notification' && props.count && props.count >  0 ? <span className="countSpan">{props.count}</span>:''}
       {props.iconName === 'Message' && props.count && props.count >  0 ? <span className="countSpan">{props.count}</span> :''}
    </div>
  );
};

export default Naves;
