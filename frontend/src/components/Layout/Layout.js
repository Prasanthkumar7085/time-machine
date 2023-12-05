import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "../../redux/user/userReducer";
import { backendURL } from "../../utils/constants";
import Header from "../Header/Header";

export default function Layout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem("time-machine"));
    login(tokens);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (tokens) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/v1/auth/refresh-tokens`,
        { refreshToken: tokens.refresh },
        config,
      );

      localStorage.setItem(
        "time-machine",
        JSON.stringify({
          access: data.tokens.access.token,
          refresh: data.tokens.refresh.token,
        }),
      );

      dispatch(updateProfile(data));

      if (location.pathname !== "/login" && location.pathname !== "/signup") {
        navigate(location.pathname);
      } else {
        navigate("/disclaimer");
      }
    } catch (error) {
      navigate("/login");
    }
    setLoading(false);
  };
  return (
    <>
      <Header />
      {!loading && <Outlet />}
      <Toaster position="top-center" />
    </>
  );
}
