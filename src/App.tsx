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
      </Routes>
    </Router>
  );
}
export default App;
