import NavBarDesk from "../../components/Home/subHomeComponents/NaveBarDesk/NavBarDesk";
import "./Home.css";
// import NavBarMobile from "../../components/Home/subHomeComponents/NavBarMobile/NavBarMobile";
// import Logo from "../../components/Home/subHomeComponents/Logo/Logo";
// import Naves from "../../components/Home/subHomeComponents/Naves/Naves";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllFeedsAPI } from "../../APIs/UserAPI";
import { userPost } from "../../Interfaces/interfaces";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NoPost from "../../components/noPostsIcon/NoPosts";
import PostCard from "../../components/post/postCard/PostCard";
import { useDispatch } from "react-redux";
import Logo from "../../components/Home/subHomeComponents/Logo/Logo";

 const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function Home() {
  const isDarkModeOn = useTypedSelector((state) => state.darkTheme.isDarkTheme);
  const [AllFeeds, setAllFeeds] = useState<userPost[]>([]);
  const userName = localStorage.getItem("userName");
  const Profile: any = localStorage.getItem("userProfile");
  // const userId = localStorage.getItem("userId");
  // const [reload,setReload] =useState<boolean>(false)
  const Dispatch = useDispatch();
  // const navigate = useNavigate();
  
  useEffect(() => {
    const fetchAllFeedsData = async () => {
      try {
        const AllFeeds = await getAllFeedsAPI();
        console.log(AllFeeds);
        
        if (AllFeeds?.data.success) {
          const data = AllFeeds.data.allFeeds.flat()
          setAllFeeds(data);
        }
      } catch (error:any) {
        console.error("Error fetching data:", error);
        if (error.response && error.response.data) {
          if (
            error.response.status === 401 &&
            error.response.data.message === "User is blocked !!"
          ) {
            localStorage.removeItem("token");
            Dispatch({ type: "logout", payload: null });
          
          }
        }
      }
    };

    fetchAllFeedsData(); 
  }, []);

  return (
    <div className={`h-full flex  ${isDarkModeOn? 'bg-black text-white' :'bg-white'}`}>
      <div className="overflow-x-hidden">
        <NavBarDesk />
      </div>
      <div className="middle w-full h-full flex  ">
        <div className={`middleBar  flex justify-around `}>
          <div className="overflow-y-scroll">
          <div className="LogoInMobileView">
            <Logo/>
          </div>
            <div className="max-w-96">{AllFeeds.length < 1 && <NoPost />}</div>
            {AllFeeds.map((post,index) => (
             <div key={index}>
                <PostCard  key={index} {...post}/>
               </div>
            ))}
          </div>
        </div>
        {/* <div className="mobileNaveBar bg-black w-full sm:hidden h-16">
          <NavBarMobile />
        </div> */}
      </div>
      <div className={`thirdBar   lg:block hidden h-full ${isDarkModeOn ? 'bg-black text-white':''}`}>
        <div className="ProfileInHome text-white mt-8 h-full">
            <Link to={'/userProfile'}>
            <div className="mb-3 flex flex-col items-center gap-6 pt-5 pb-20 rounded-md   bg-green-800 mr-5 text-center " style={{boxShadow:`${isDarkModeOn ? "rgb(0 255 65) 5px 3px 20px":'rgb(0 0 0) 0px 3px 10px'}`} }>
            {Profile ? (
              <img
                src={Profile}
                style={{ borderRadius: "50%", width: "120px", height: "120px" }}
                alt="Profile"
              />
            ) : (
              <i className="fa-solid fa-user" style={{ fontSize: "30px" }}></i>
            )}
            <h1 className="ml-2">{userName}</h1>
            <div>
            <div className=" text-white" >
              <h6 className="text-xs">© 2024 do_Travel FROM Brocamp</h6>
            </div>
          </div>
          </div>
            </Link>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
