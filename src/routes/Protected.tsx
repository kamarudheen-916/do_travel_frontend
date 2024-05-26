import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import axiosInstance from "../services/axios";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const Dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserBlocked = async () => {
      if (token) {
        try {
          await axiosInstance.get("/user/checkIsBlocked");
          setLoading(false); // Set loading to false when request succeeds
        } catch (error: any) {
          setLoading(true); // Set loading to false when request succeeds

          if (error.response && error.response.data) {
            if (
              error.response.status === 401 &&
              error.response.data.message === "User is blocked !!"
            ) {
              localStorage.removeItem("token");
              Dispatch({ type: "logout", payload: null });
              navigate("/login");
            }
          }
          setLoading(false); // Set loading to false when request fails
        }
      }
    };

    checkUserBlocked();
  }, [token, Dispatch, navigate]);

  // While loading, you can show a loading spinner or any other indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // When not loading, render the children components
  return <>{children}</>;
};

export default ProtectedRoute;
