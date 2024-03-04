import { Navigate, Route, Routes } from "react-router-dom";
import { AnonymousLayout, MainLayout } from "../components";
import ScrollToTop from "../components/layouts/components/ScrollToTop";
import {
  AccountIndex,
  CategoryIndex,
  HomeIndex,
  Login,
  NotFound,
  OrderReceived,
  ProductIndex,
  Register,
} from "../pages";
import { LoginandRegisterProtect, ProtectedRoute } from "./ProtectedRoute";

const RoutesList = () => {
  ScrollToTop();
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/product" element={<Navigate to="/404" replace />} />
        <Route path="/product/:productId" element={<ProductIndex />} />
        <Route path="/orderReceived">
          <Route element={<ProtectedRoute />}>
            <Route index={true} element={<OrderReceived />} />
          </Route>
        </Route>
        <Route path="/category" element={<Navigate to="/404" replace />} />
        <Route path="/category/:categoryId" element={<CategoryIndex />} />
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesList;
