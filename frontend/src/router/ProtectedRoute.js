import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  const location = useLocation();
  const { tokens, isDisclaimerAccepted } = useSelector((state) => state.user);

  if (tokens) {
    if (isDisclaimerAccepted) {
      if (location.pathname === "/disclaimer") {
        return <Navigate to="/demographics" />;
      }
      return <Outlet />;
    } else {
      return <Navigate to="/disclaimer" />;
    }
  }

  return <Navigate to="/login" />;
};
