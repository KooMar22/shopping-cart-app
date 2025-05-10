import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Header.css";
import "../styles/Footer.css";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="layout-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;