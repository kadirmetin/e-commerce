import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./components/AdminHeader/AdminHeader";

const AdminLayout = () => {
  useEffect(() => {
    document.title = "SMA Shop | Admin Panel";
  }, []);

  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

export default AdminLayout;
