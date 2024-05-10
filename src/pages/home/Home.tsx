import NavBarDesk from "../../components/Home/subHomeComponents/NaveBarDesk/NavBarDesk";
import "./Home.css";
import NavBarMobile from "../../components/Home/subHomeComponents/NavBarMobile/NavBarMobile";
import Logo from "../../components/Home/subHomeComponents/Logo/Logo";
import Naves from "../../components/Home/subHomeComponents/Naves/Naves";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllFeedsAPI } from "../../APIs/UserAPI";
import { userPost } from "../../Interfaces/interfaces";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NoPost from "../../components/noPostsIcon/NoPosts";

 const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function Home() {
  const isDarkModeOn = useTypedSelector((state) => state.darkTheme.isDarkTheme);
  const [AllFeeds, setAllFeeds] = useState<userPost[]>([]);
  const userName = localStorage.getItem("userName");
  const Profile: any = localStorage.getItem("userProfile");
  const userId = localStorage.getItem("userId");
  const [reload,setReload] =useState<boolean>(false)

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const AllFeeds = await getAllFeedsAPI();
        console.log(AllFeeds);
        
        if (AllFeeds?.data.success) {
          const data = AllFeeds.data.allFeeds.flat()
          console.log('*****>',AllFeeds.data.allFeeds);
          
          setAllFeeds(data);
        } else {
          console.log(AllFeeds?.data.message) 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 
  }, []);

  return (
    <div className={`h-full flex  `}>
      <div className="overflow-x-hidden">
        <NavBarDesk reload={setReload}/>
      </div>
      <div className="middle w-full h-full flex  ">
        <div className={`middleBar  flex justify-around ${isDarkModeOn? 'bg-black' :'bg-white'}`}>
          <div className="overflow-y-scroll">
            <div className="w-96">{AllFeeds.length < 1 && <NoPost />}</div>
            {AllFeeds.map((post,index) => (
              <div key={index} className="postInHome mt-10">
                <div className="topDiv flex justify-between items-center mt-5 mb-3">
                  <div className="profileAndName flex items-center ">
                    <div className="profileImageOnHome">
                      <img src="/images/image1.jpg" alt="" />
                    </div>
                    <div className="profileAndName font-medium ml-3">
                      <h1>Vally Resort</h1>
                    </div>
                  </div>
                  <div>
                    <button className="BookNowButton bg-stone-400">
                      Book Now
                    </button>
                  </div>
                </div>
                <div className="imageOrVedio rounded">
                  <img src={post.post} alt="" />
                </div>
                <div className="likeDiv flex justify-between mt-1">
                  <div className="likeCommentShare flex w-24 justify-between">
                    <div>
                      <i className="fa-regular fa-heart text-xl text-stone-800"></i>
                    </div>
                    <div>
                      <i className="fa-regular fa-comment text-xl text-stone-800"></i>
                    </div>
                    <div>
                      <i className="fa-regular fa-paper-plane text-xl text-stone-800"></i>
                    </div>
                  </div>
                  <div className="save">
                    <div>
                      <i className="fa-regular fa-bookmark text-xl text-stone-800"></i>
                    </div>
                  </div>
                </div>
                <div className="description">
                  <h1>{post.description} </h1>
                </div>
                <div className="ratingDiv mt-4 flex justify-between">
                  <div className="Rating bg-stone-400">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                  </div>
                  <div>
                    <Link className="pb-1 px-3 rounded bg-stone-400" to={""}>
                      Chat With Resort
                    </Link>
                  </div>
                </div>
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
