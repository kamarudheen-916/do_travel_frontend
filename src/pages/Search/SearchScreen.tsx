import React, { useState } from 'react';
import './SearchScreen.css';
import { searchData } from '../../Interfaces/interfaces';
import SearchSkeleton from '../../components/skeloton/userSkeleton';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';

import { Socket, io } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000');
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface Props {
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchData: searchData[] | undefined;
  searchInputValue: string;
}

const SearchScreen: React.FC<Props> = ({ onClose, onChange, searchData, searchInputValue }) => {
  const Navigate =  useNavigate()
  const isDarkModeOn = useTypedSelector(state => state.darkTheme.isDarkTheme);
  const [filterOption, setFilterOption] = useState<'All' | 'People' | 'Stays'>('All');
  // const userName = localStorage.getItem('userName')
  const filteredData = () => {
    if (!searchData) return [];
    let filtered = searchData;
    if (filterOption === 'People') {
      filtered = filtered.filter(data => !data.isProperty); // Filtering normal users
    } else if (filterOption === 'Stays') {
      filtered = filtered.filter(data => data.isProperty); // Filtering properties
    }
    filtered = filtered.filter(data => data.name.toLowerCase().includes(searchInputValue.toLowerCase()));
    return filtered;
  };

  const handleEmitChat = (profileId: string | undefined) => {
    socket.emit('newChat', { profileId, socketID: socket.id });
    Navigate('/messages');
  };

  return (
    <div className={`search-screen ${isDarkModeOn ? 'bg-black text-black bg-opacity-85 ' : ''}`}>
      <div className="search-screen-content">
        <input type="text" onChange={onChange} placeholder="Search..." />
        <div className="gap-3 flex text-sm text-green-700">
          <div className={filterOption === 'All' ? 'cursor-pointer active' : 'cursor-pointer'} onClick={() => setFilterOption('All')}>All</div>
          <div className={filterOption === 'People' ? 'cursor-pointer active' : 'cursor-pointer'} onClick={() => setFilterOption('People')}>People</div>
          <div className={filterOption === 'Stays' ? 'cursor-pointer active' : 'cursor-pointer'} onClick={() => setFilterOption('Stays')}>Stays</div>
        </div>
        <button onClick={onClose}>X</button>
      </div>
      {searchData && filteredData().length < 1 &&
        <div>
          <SearchSkeleton />
        </div>}
      <div>
        {filteredData().map((data, index) => (
          <div className='searchData justify-between' key={index}>
            <Link to={`/OthersProfile/${data && data.profileId}/${data && data.isProperty}`}>
              <div className='flex'>
                <div className="userProfileImage">
                  {data.profile ? <img src={data.profile} alt="" /> : <div className='overflow-hidden text-green-700'><i className="fa-solid fa-user" style={{ fontSize: "30px" }}></i></div>}
                </div>
                <div className='userProfileName'>
                  <div className='nameDiv'>
                    <h1 className={`${isDarkModeOn ? 'text-gray-300' : ''}`}>{data.name}</h1>
                    {data.isProperty && <h1 className='isPropery'>Property</h1>}
                  </div>
                </div>
              </div>
            </Link>
            <div onClick={() => handleEmitChat(data.profileId)} className={`text-green-600 cursor-pointer mr-2`}>
              <h1>Chat</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchScreen;
