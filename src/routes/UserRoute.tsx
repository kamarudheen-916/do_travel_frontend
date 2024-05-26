import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Profile from "../pages/Profile/Profile";
import OthersProfle from "../pages/OthersProfile/OthersProfle";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import Notificatoin from "../pages/Notifications/Notificatoin";
import ForgottenPassword from "../pages/ForgottenPassword/Forgotten";
import Bookings from "../pages/Bookings/Booking";
import Messages from "../pages/Messages/Messages";
import { RootState } from "../redux/store";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Otp from "../pages/Otp/Otp";
import PaymentSuccess from "../pages/payments/paymentSuccess";
import PaymentCancel from "../pages/payments/paymentCancel";
import ProtectedRoute from "./Protected";
const UserRoutes: React.FC = () => {
  const token = useSelector((state:RootState)=>state.auth.token)

  return (
   
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
      <Route path="/forgottenPassword" element={!token ? <ForgottenPassword /> : <Navigate to="/" />} />
      <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" />} />
      <Route path="/otp" element={!token ? <Otp /> : <Navigate to="/" />} />
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
      <Route path="/userProfile" element={token ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/notifications" element={token ? <Notificatoin /> : <Navigate to="/login" />} />
      <Route path="/bookings" element={token ? <Bookings /> : <Navigate to="/login" />} />
      <Route path="/messages" element={token ? <Messages /> : <Navigate to="/login" />} />
      <Route path="/OthersProfile/:profileId/:isProperty" element={token ? <OthersProfle /> : <Navigate to="/login" />} />
      <Route path="/paymentSuccess" element={token ? <PaymentSuccess /> : <Navigate to="/login" />} />
      <Route path="/paymentCancell" element={token ? <PaymentCancel /> : <Navigate to="/login" />} />

    </Routes>
   
  ); 
};

export default UserRoutes;
