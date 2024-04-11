import NavBarDesk from "./subHomeComponents/NaveBarDesk/NavBarDesk"
import './Home.css'
import NavBarMobile from "./subHomeComponents/NavBarMobile/NavBarMobile"
import Logo from "./subHomeComponents/Logo/Logo"
import Input from "../atoms/Input/Input"
import Naves from "./subHomeComponents/Naves/Naves"
import { Link } from "react-router-dom"
import Avatar from 'react-avatar';

// import lskdn from '../../../public/images/image1.jpg'
function Home() {
  const userName = localStorage.getItem('userName')
  const Profile :any = localStorage.getItem('userProfile')
  return (
    <div className="h-full sm:flex ">
      <div className="navBar  sm:block hidden bg-stone-200 md:w-96 w-60 pl-2  h-full">
        <NavBarDesk/>
      </div>
      <div className="middle w-full h-full flex flex-col ">
          <div className="topBar sm:hidden h-16 bg-stone-400 flex items-center justify-around">
            <Logo />
            <div className="mt-2 " id="searchInputOnMobile">
              <Input type="text" placeholder="Search "/>
            </div>
            <div id="notificationIconOnMobile">
              <Naves 
                icon={<i className="fa-solid fa-bell text-xl"></i>}
                //  iconName="Notification" 
                 />
            </div>
          </div>
          <div className="middleBar bg-white flex justify-around">
              <div className="overflow-y-scroll">
                  <div className="postInHome mt-10">
                      <div className="topDiv flex justify-between items-center mt-5 mb-3">
                        <div className="profileAndName flex items-center ">
                          <div className="profileImageOnHome">
                            <img  src="/images/image1.jpg" alt="" />
                          </div>
                          <div className="profileAndName font-medium ml-3">
                           <h1>Vally Resort</h1>
                          </div>
                        </div>
                        <div>
                            <button className="BookNowButton bg-stone-400">Book Now</button>
                        </div>
                      </div>
                      <div className="imageOrVedio rounded">
                        <img src="/images/image1.jpg" alt="" />
                      </div>
                      <div className="likeDiv flex justify-between mt-1">
                          <div className="likeCommentShare flex w-24 justify-between">
                              <div><i className="fa-regular fa-heart text-xl text-stone-800" ></i></div>
                              <div><i className="fa-regular fa-comment text-xl text-stone-800"></i></div>
                              <div><i className="fa-regular fa-paper-plane text-xl text-stone-800"></i></div>
                          </div>
                          <div className="save">
                            <div><i className="fa-regular fa-bookmark text-xl text-stone-800"></i></div>
                          </div>
                      </div>
                      <div className="description">
                        <h1>Lorem Ipsum is simply dummy text of the </h1>
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
                              <Link className="pb-1 px-3 rounded bg-stone-400" to={''} >Chat With Resort</Link>
                          </div>
                      </div>
                  </div>
                  <div className="postInHome mt-10">
                      <div className="topDiv flex justify-between items-center mt-5 mb-3">
                        <div className="profileAndName flex items-center ">
                          <div className="profileImageOnHome">
                            <img  src="/images/image1.jpg" alt="" />
                          </div>
                          <div className="profileAndName font-medium ml-3">
                           <h1>Vally Resort</h1>
                          </div>
                        </div>
                        <div>
                            <button className="BookNowButton bg-stone-400">Book Now</button>
                        </div>
                      </div>
                      <div className="imageOrVedio rounded">
                        <img src="/images/image1.jpg" alt="" />
                      </div>
                      <div className="likeDiv flex justify-between mt-1">
                          <div className="likeCommentShare flex w-24 justify-between">
                              <div><i className="fa-regular fa-heart text-xl text-stone-800" ></i></div>
                              <div><i className="fa-regular fa-comment text-xl text-stone-800"></i></div>
                              <div><i className="fa-regular fa-paper-plane text-xl text-stone-800"></i></div>
                          </div>
                          <div className="save">
                            <div><i className="fa-regular fa-bookmark text-xl text-stone-800"></i></div>
                          </div>
                      </div>
                      <div className="description">
                        <h1>Lorem Ipsum is simply dummy text of the </h1>
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
                              <Link className="pb-1 px-3 rounded bg-stone-400" to={''} >Chat With Resort</Link>
                          </div>
                      </div>
                  </div>
                  <div className="postInHome mt-10">
                      <div className="topDiv flex justify-between items-center mt-5 mb-3">
                        <div className="profileAndName flex items-center ">
                          <div className="profileImageOnHome">
                            <img  src="/images/image1.jpg" alt="" />
                          </div>
                          <div className="profileAndName font-medium ml-3">
                           <h1>Vally Resort</h1>
                          </div>
                        </div>
                        <div>
                            <button className="BookNowButton bg-stone-400">Book Now</button>
                        </div>
                      </div>
                      <div className="imageOrVedio rounded">
                        <img src="/images/image1.jpg" alt="" />
                      </div>
                      <div className="likeDiv flex justify-between mt-1">
                          <div className="likeCommentShare flex w-24 justify-between">
                              <div><i className="fa-regular fa-heart text-xl text-stone-800" ></i></div>
                              <div><i className="fa-regular fa-comment text-xl text-stone-800"></i></div>
                              <div><i className="fa-regular fa-paper-plane text-xl text-stone-800"></i></div>
                          </div>
                          <div className="save">
                            <div><i className="fa-regular fa-bookmark text-xl text-stone-800"></i></div>
                          </div>
                      </div>
                      <div className="description">
                        <h1>Lorem Ipsum is simply dummy text of the </h1>
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
                              <Link className="pb-1 px-3 rounded bg-stone-400" to={''} >Chat With Resort</Link>
                          </div>
                      </div>
                  </div>
                  
              </div>
          </div>
          <div className="mobileNaveBar bg-black w-full sm:hidden h-16" >
            <NavBarMobile />
          </div>
      </div>
      <div className="thirdBar   lg:block hidden    h-full bg-stone-800">
        <div className="ProfileInHome text-white mt-4 ml-7 p-2 h-full">
            <div className="flex items-center mb-3" >
                  
               {Profile ? (
                <img src={Profile} style={{ borderRadius: '50%', width: '50px', height: '50px' }} alt="Profile" />
              ) : (
                <i className="fa-solid fa-user" style={{fontSize:'30px'}}></i> 
              )}
                  <h1 className="ml-2">{userName}</h1>
            </div>
            <div className="mt-10">
              <h1>Recelntly Saved</h1>
              <ol className="mt-5">
                <li className="flex py-3 ">
                      <img src="images/image1.jpg" style={{borderRadius:'50%',width:'30px',height:'30px' }} alt="" />
                    <div className="ml-2 flex items-center text-sm">
                      <h1 className="mr-6 " >Vally Resort</h1>
                      <h1>Follow</h1>
                    </div>
                </li>
                <li className="flex py-3 ">
                      <img src="images/image1.jpg" style={{borderRadius:'50%',width:'30px',height:'30px' }} alt="" />
                    <div className="ml-2 flex items-center text-sm">
                      <h1 className="mr-6 " >Vally Resort</h1>
                      <h1>Follow</h1>
                    </div>
                </li>
                <li className="flex py-3 ">
                      <img src="images/image1.jpg" style={{borderRadius:'50%',width:'30px',height:'30px' }} alt="" />
                    <div className="ml-2 flex items-center text-sm">
                      <h1 className="mr-6 " >Vally Resort</h1>
                      <h1>Follow</h1>
                    </div>
                </li>
                <li className="flex py-3 ">
                      <img src="images/image1.jpg" style={{borderRadius:'50%',width:'30px',height:'30px' }} alt="" />
                    <div className="ml-2 flex items-center text-sm">
                      <h1 className="mr-6 " >Vally Resort</h1>
                      <h1>Follow</h1>
                    </div>
                </li>
                <li className="flex py-3 ">
                      <img src="images/image1.jpg" style={{borderRadius:'50%',width:'30px',height:'30px' }} alt="" />
                    <div className="ml-2 flex items-center text-sm">
                      <h1 className="mr-6 " >Vally Resort</h1>
                      <h1>Follow</h1>
                    </div>
                </li>
                
              </ol> 
              <h1 className="text-blue-500">click here for more</h1>
            </div>
            <div>
              <div className="" style={{marginTop:'250px'}}>
              <h6 className="text-xs">© 2024 do_Travel  FROM Brocamp</h6>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home
