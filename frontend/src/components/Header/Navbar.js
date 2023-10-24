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
            <Link to="/">Home</Link>
          </li>
        );
      case "/demographics":
        return (
          <li>
            <Link to="/">Home</Link>
          </li>
        );
      case "/stats":
        return (
          <li>
            <Link to="/">Home</Link>
          </li>
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        {renderMenu()}
        {!(
          location.pathname === "/login" || location.pathname === "/signup"
        ) && (
          <>
            {location.pathname !== "/stats" && (
              <li>
                <Link to="/stats">Stats</Link>
              </li>
            )}
            <li className="cursor-pointer" onClick={logout}>
              <Link>Logout</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
