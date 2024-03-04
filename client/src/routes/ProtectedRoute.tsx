import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/account/login" />;
  }

  return <Outlet />;
};

export const LoginandRegisterProtect = () => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};
