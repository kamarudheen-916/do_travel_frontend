import React, { useEffect, useState } from "react";
import "./adminEdit.css";
import InputFile from "../../../components/atoms/Input_Type_File/InputFile";
import Loading from "../../../components/Loading/LineLoader/LineLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditUserProfile from "../../../components/editUserProfile/editUserProfile";
import EditPropertyProfile from "../../../components/editPropertyProfile/EditPropertyProfile";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { fetchUserDataAPI, updateUserDataAPI, uploadadminSideImgAPI } from "../../../API_admin/adminAPI";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;        

interface EditProfileProps {
  isEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
  userType: string;
}

const AdminEdit: React.FC<EditProfileProps> = ({ isEditProfile, userId, userType }) => {
  const isDarkModeOn = useTypedSelector((state) => state.darkTheme.isDarkTheme);
  const notifySuccess = (message: string) => toast.success(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true
  });
  const notifyError = (message: any) => toast.error(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [propertyFormData, setPropertyFormData] = useState({
    PropertyName: '',
    email: '',
    password: '',
    isBlocked: false,
    startedDate: '',
    Address: '',
    TypeOfStay: [''],
    Speciality: [''],
    MobileNumber: '',
    license: '',
    PropertyProfile: '',
    IsVerified: false,
    OTP: '',
  });
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isBlocked: false,
    gender: "",
    DOB: "",
    Country: "",
    State: "",
    MobileNumber: "",
    City: "",
    favoritePlace: [""],
    Profile: "",
    IsVerified: false,
    OTP: "",
  });
  const [fileUrl, setFileUrl] = useState<string>("");

  const handleInputFileURL = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        setFileUrl(dataUrl);
        const uploadImgRes = await uploadadminSideImgAPI(dataUrl, userId, userType);
        if (uploadImgRes.data.success) {
          setIsLoading(false);
          localStorage.setItem('userProfile', uploadImgRes.data.fileUrl);
          notifySuccess(uploadImgRes.data.message);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetchUserDataAPI(userId, userType);
        if (res.data.success) {
          const userData = res.data.user;
          userData.password = '';
          if (userType === 'user') {
            setUserFormData(userData);
            setFileUrl(userData.Profile);
          } else {
            setPropertyFormData(userData);
            setFileUrl(userData.PropertyProfile);
          }
        } else {
          console.log('Cannot fetch user data');
        }
      } catch (error) {
        notifyError(error);
      }
    };
    fetchUserData();
  }, [userId, userType]);

  const handleEditProfileSubmit = async () => {
    const userData = userType === 'user' ? userFormData : propertyFormData;
    const res = await updateUserDataAPI(userData, userId, userType);
    if (res.data.success) {
      notifySuccess(res.data.message);
    } else {
      notifyError(res.data.message);
    }
  };

  return (
    <div className={`${isDarkModeOn ? 'bg-black text-white' : ''}`}>
      <div>
        <ToastContainer />
      </div>
      <div className="editProfileOverlay"></div>
      <div className="editProfileMain">
        <div>
          <span
            onClick={() => isEditProfile(false)}
            className="editProfileCloseButton"
          >
            X
          </span>
        </div>
        <div className="w-full bg-green-800 p-1 font-bold text-white text-center">
          Edit Profile
        </div>
        <div className={`p-4 ${isDarkModeOn ? 'bg-black text-white' : ''}`}>
          <div className={`editBody  flex justify-center gap-32 ${isDarkModeOn ? 'bg-black text-white' : ''}`}>
            <div className="editImg">
              <div>
                {fileUrl ? (
                  <img src={fileUrl} alt="" />
                ) : (
                  <i className="fa-solid fa-user text-green-800 userAvatar"></i>
                )}
              </div>
              <div className="mt-1">{isLoading && <Loading />}</div>
              <div>
                <InputFile handleFileURL={handleInputFileURL} />
              </div>
            </div>
            <div className="OtherInfo">
              {userType === 'user' ?
                <EditUserProfile
                  setUserFormData={setUserFormData}
                  userFormData={userFormData}
                />
                :
                <EditPropertyProfile
                  propertyFormData={propertyFormData}
                  setPropertyFormData={setPropertyFormData}
                />}
            </div>
          </div>
          <div className="editSubmit ">
            <button
              onClick={handleEditProfileSubmit}
              className="bg-green-800 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEdit;
