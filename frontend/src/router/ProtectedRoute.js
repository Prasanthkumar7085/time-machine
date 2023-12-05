import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const location = useLocation();
  const { tokens, isDisclaimerAccepted } = useSelector((state) => state.user);

  if (tokens) {
    if (!isDisclaimerAccepted) {
      if (location.pathname === "/disclaimer") {
        return <Outlet />;
      }
      return <Navigate to="/disclaimer" />;
    }
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};
