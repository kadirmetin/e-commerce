import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main
        style={{
          height: "100%",
          width: "100%",
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
