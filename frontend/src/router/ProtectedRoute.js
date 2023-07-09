import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  const { tokens } = useSelector((state) => state.user);
  return tokens ? <Outlet /> : <Navigate to="/login" />;
};
