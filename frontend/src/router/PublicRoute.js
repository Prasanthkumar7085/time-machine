import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = () => {
  const { tokens } = useSelector((state) => state.user);

  if (tokens) {
    return <Navigate to="/scientist-name" />;
  }

  return <Outlet />;
};
