import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main
        style={{
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
