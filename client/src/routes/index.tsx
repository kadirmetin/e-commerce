import { Route, Routes } from "react-router-dom";
import { AnonymousLayout, MainLayout } from "../components";
import { AccountIndex, HomeIndex, ProductIndex } from "../pages";

const RoutesList = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/product" element={<ProductIndex />} />
      </Route>
      <Route element={<AnonymousLayout />}>
        <Route path="/account" element={<AccountIndex />} />
      </Route>
    </Routes>
  );
};

export default RoutesList;
