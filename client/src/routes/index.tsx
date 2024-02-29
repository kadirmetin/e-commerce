import { Route, Routes } from "react-router-dom";
import { AnonymousLayout, MainLayout } from "../components";
import { AccountIndex, HomeIndex, ProductIndex } from "../pages";
import Login from "../pages/Account/Login";
import Register from "../pages/Account/Register";
import { LoginandRegisterProtect, ProtectedRoute } from "./ProtectedRoute";

const RoutesList = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/product" element={<ProductIndex />} />
      </Route>
      <Route path="/account">
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route index={true} element={<AccountIndex />} />
          </Route>
        </Route>
        <Route element={<AnonymousLayout />}>
          <Route element={<LoginandRegisterProtect />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />R
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default RoutesList;
