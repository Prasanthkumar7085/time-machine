import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const { tokens } = useSelector((state) => state.user);

  if (tokens) {
    return <Navigate to="/scientist-name" />;
  }

  return <Outlet />;
};
