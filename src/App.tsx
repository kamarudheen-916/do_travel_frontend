import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgottenPassword from "./pages/ForgottenPassword/Forgotten";
import Otp from "./pages/Otp/Otp";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import OthersProfle from "./pages/OthersProfile/OthersProfle";
import AdminLogin from "./pagesAdmin/adminLogin";
import AdminSignup from "./pagesAdmin/AdminSignup";
import AdminHome from "./pagesAdmin/AdminHome";
import AdminUser from "./pagesAdmin/AdminUser";
import AdminProperty from "./pagesAdmin/AdminProperty";
import AdminBookings from "./pagesAdmin/AdminBookings";
import AdminReports from "./pagesAdmin/AdminReports";
import AdminPosts from "./pagesAdmin/AdminPosts";
import AdminRooms from "./pagesAdmin/AdminRooms";
import Notificatoin from "./pages/Notifications/Notificatoin";
import Bookings from "./pages/Bookings/Booking";
import Messages from "./pages/Messages/Messages";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function App() {
  const token = useTypedSelector((state) => state.auth.token);
  return (

    <Router>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgottenPassword"
          element={!token ? <ForgottenPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route path="/otp" element={!token ? <Otp /> : <Navigate to={"/"} />} 
        />
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/userProfile"
          element ={token ? <Profile/> : <Navigate to={'/login'}/>} 
          />
          <Route
          path="/notifications"
          element ={token ? <Notificatoin/> : <Navigate to={'/login'}/>} 
          />
           <Route
          path="/bookings"
          element ={token ? <Bookings/> : <Navigate to={'/login'}/>} 
          />
           <Route
          path="/messages"
          element ={token ? <Messages/> : <Navigate to={'/login'}/>} 
          />
        <Route
          path="/OthersProfile/:profileId/:isProperty" 
          element ={token ? <OthersProfle /> : <Navigate to={'/login'}/>} 
        />
        <Route
          path="/adminLogin"
          element={<AdminLogin/>}
        />
         <Route
          path="/adminSignup"
          element={<AdminSignup/>}
        />
         <Route
          path="/adminHome"
          element={<AdminHome/>}
        />
        <Route
          path="/adminUser"
          element={<AdminUser/>}
        />
        <Route
          path="/adminProperties"
          element={<AdminProperty/>}
        />
        <Route
          path="/adminBookings"
          element={<AdminBookings/>}
        />
        <Route
          path="/adminReports"
          element={<AdminReports/>}
        />
        <Route
          path="/adminPosts"
          element={<AdminPosts/>}
        />
        <Route
          path="/adminRooms"
          element={<AdminRooms/>}
        />
      </Routes>
    </Router>

  );
}
export default App;
