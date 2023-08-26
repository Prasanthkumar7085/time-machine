import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/user/userActions";

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };
  const renderMenu = () => {
    switch (location.pathname) {
      case "/login":
        return (
          <li>
            <Link to="/signup">Join Time Machine!</Link>
          </li>
        );
      case "/signup":
        return (
          <li>
            <Link to="/login">Login</Link>
          </li>
        );
      case "/disclaimer":
        return (
          <li>
            <Link to="/welcome">Home</Link>
          </li>
        );
      default:
      case "/demographics":
        return (
          <li>
            <Link to="/welcome">Home</Link>
          </li>
        );
    }
  };
  return (
    <div className="flex-none">
      <div className="text-sm breadcrumbs">
        <ul>
          {renderMenu()}
          {!(
            location.pathname === "/login" || location.pathname === "/signup"
          ) && (
            <li className="cursor-pointer" onClick={logout}>
              Logout
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
