import { Navigate, Route, Routes } from "react-router-dom";
import { AnonymousLayout, MainLayout } from "../components";
import AdminLayout from "../components/layouts/AdminLayout";
import ScrollToTop from "../components/layouts/components/ScrollToTop";
import {
  AccountIndex,
  AdminIndex,
  CategoryIndex,
  HomeIndex,
  Login,
  NotFound,
  OrderReceived,
  ProductAddIndex,
  ProductIndex,
  ProductsIndex,
  Register,
} from "../pages";
import {
  AdminProtect,
  LoginandRegisterProtect,
  ProtectedRoute,
} from "./ProtectedRoute";

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
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route index={true} element={<AccountIndex />} />
          </Route>
        </Route>
        <Route element={<LoginandRegisterProtect />}>
          <Route element={<AnonymousLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Route>
      <Route path="/admin">
        <Route element={<AdminProtect />}>
          <Route element={<AdminLayout />}>
            <Route index={true} element={<AdminIndex />} />
            <Route path="/admin/products" element={<ProductsIndex />} />
            <Route path="/admin/products/add" element={<ProductAddIndex />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesList;
