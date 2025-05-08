import { Outlet } from "react-router-dom";
import Header from "./Header";
import "../styles/Header.css";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="layout-container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;