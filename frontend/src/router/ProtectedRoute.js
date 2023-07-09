import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  const { email } = useSelector((state) => state.user);
  console.log(email);
  return email ? <Outlet /> : <Navigate to="/login" />;
};
