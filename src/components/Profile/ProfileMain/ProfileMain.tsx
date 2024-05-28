import "./ProfileMain.css";
import { Room, userPost } from "../../../Interfaces/interfaces";
import ProfileModal from "../../../modals/userProfileModal/profileModal";
import React, { useEffect, useState } from "react";
import ProfileTop from "../ProfileTop/ProfileTop";
import PostShow from "../ProfilePostShow/PostShow";

import NoPost from "../../noPostsIcon/NoPosts";
import Rooms from "../PropertyRooms/Rooms";
import AddRooms from "../../../modals/addRoomsModal/AddRooms";
import { fetchRoomDataAPI } from "../../../APIs/propertyAPI";

interface props {
  allPosts: userPost[];
  isOpenProfileModal: boolean;
  setIsOpenProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  othersProfile?: boolean;
  otherProfileId?: string;
}

const ProfileMain: React.FC<props> = ({
  allPosts,
  isOpenProfileModal,
  setIsOpenProfileModal,
  othersProfile,
}) => {
  const userType = localStorage.getItem("userType");
  const [isRoom, setIsRoom] = useState<boolean>(true);
  const [isAddRoom, setAddRoom] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<Room[]>();
  const [RoomEditModalOpen,setRoomEditModalOpen] = useState<boolean>(false)
  // const [isOpenProfileModal,setIsOpenProfileModal] = useState<boolean>(false)
  const [modalData, setModalData] = useState<userPost[]>();

  const userName = localStorage.getItem("userName");
  const porfile: any = localStorage.getItem("userProfile");

  const onPostClick = (post: userPost) => {
    const datas = allPosts.filter((item) => item._id !== post._id);
    datas.unshift(post);
    console.log(datas.length);
    setIsOpenProfileModal(true);
    setModalData(datas);
  };
  useEffect(() => {
    console.log('userType',userType);
    
    if (userType === "user") {
      setIsRoom(false);
    console.log('set is room',isRoom);

    }
  }, []);

  useEffect(() => {
    const fetchRoomData = async () => {
      if (userType === "property") {
        const res = await fetchRoomDataAPI();
        if (res) {
          setRoomData(res.data.reverse());
        }
      }
    };
    fetchRoomData();
  }, [isAddRoom,RoomEditModalOpen]);
  return (
    <div className="max-w-4xl min-w-96  h-dvh overflow-y-scroll relative">
      <div className="profileTopDiv">
        <ProfileTop
          isProperty={userType === "property" ? true : false}
          isOthersProfile={othersProfile ? othersProfile : false}
          numberOfPosts={allPosts?.length}
          profile={porfile}
          userName={userName}
        />
      </div>

      {userType === "property" && allPosts?.length > 0 && (
        <div className="border-green-800 border-2  flex  ">
          <div
            onClick={() => setIsRoom(false)}
            className={`font-bold w-full  text-center cursor-pointer ${
              !isRoom ? `bg-green-800 text-white` : ``
            } ${isRoom ? `hover:bg-gray-200` : ``}    `}
          >
            Posts
          </div>
          <div
            onClick={() => setIsRoom(true)}
            className={`font-bold w-full text-center cursor-pointer ${
              isRoom ? `bg-green-800 text-white` : ``
            } ${!isRoom ? `hover:bg-gray-200` : ``}  `}
          >
            Rooms
          </div>
        </div>
      )}

      {!isRoom && (
        <div className="PostShowDiv ">
          {allPosts.length > 0 ? (
            <PostShow allPosts={allPosts} onPostClick={onPostClick} />
          ) : (
            <NoPost />
          )}
        </div>
      )}
      {isRoom && userType === 'property' &&(
        <div className="roomShowDiv">
          <div>
            <button className="addRoomButton" onClick={() => setAddRoom(true)}>
              Add Room
            </button>
          </div>
          {roomData?.length && roomData?.length < 1? <NoPost /> : <Rooms setRoomData={setRoomData} setRoomEditModalOpen={setRoomEditModalOpen} RoomEditModlaOpen={RoomEditModalOpen} roomData={roomData} />}
        </div>
      )}

      {isOpenProfileModal && (
        <div className="ProfileModal ">
          <ProfileModal
            modalData={modalData}
            closeModal={setIsOpenProfileModal}
          />
        </div>
      )}
      {isAddRoom && (
        <div className="addRoomModal">
          <AddRooms closeModal={setAddRoom} />
        </div>
      )}
    </div>
  );
};

export default ProfileMain;
