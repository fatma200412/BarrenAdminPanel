import { Outlet } from "react-router-dom";
import Header from "../../../components/header";
import style from "./index.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import Login from "../login";

function AdminRoot() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="flex">
      {isLogin ? (
        <>
          <Header toggleNavbar={toggleNavbar} isNavbarOpen={isNavbarOpen} />
          <div
            className={`${style.content} ${
              isNavbarOpen ? style.contentOpen : style.contentClosed
            }`}
          >
            <Outlet />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default AdminRoot;
