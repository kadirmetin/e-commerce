import { Outlet } from "react-router-dom";
import AdminHeader from "./components/AdminHeader/AdminHeader";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

export default AdminLayout;
