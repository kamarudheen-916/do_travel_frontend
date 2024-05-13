import React from 'react';
import './CustomAlert.css';
import { useTypedSelector } from '../../../redux/reduxUseSelector';

interface CustomAlertProps {
  message: string;
  onClose: () => void;
}

const CustomRedAlert: React.FC<CustomAlertProps> = ({ message, onClose }) => {
    const isDarkModeOn = useTypedSelector((state) => state.darkTheme.isDarkTheme);
  return (
    <div className={`custom-alert ${isDarkModeOn ? 'bg-slate-700 text-white':'bg-slate-400'} `}>
     <div className='flex gap-3'>
        <p>{message}</p>
        <i className="fa-regular fa-circle-xmark text-red-600"></i>
      </div>
      <button className='bg-red-800' onClick={onClose}>Close</button>
    </div>
  );
};

export default CustomRedAlert;
