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

export const AdminProtect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/account/login" />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};
