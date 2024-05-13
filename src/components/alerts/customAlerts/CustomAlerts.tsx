import React from 'react';
import './CustomAlert.css';
import { useTypedSelector } from '../../../redux/reduxUseSelector';

interface CustomAlertProps {
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, onClose }) => {
    const isDarkModeOn = useTypedSelector((state) => state.darkTheme.isDarkTheme);
  return (
    <div className={`custom-alert ${isDarkModeOn ? 'bg-slate-700 text-white':'bg-slate-400'} `}>
      <div className='flex gap-3 items-center'>
        <p>{message}</p>
        <i className="fa-solid fa-circle-check text-green-600 text-2xl"></i>
      </div>
      <button className='bg-green-800' onClick={onClose}>Close</button>
    </div>
  );
};

export default CustomAlert;
