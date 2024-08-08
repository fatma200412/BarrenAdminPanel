import { Outlet } from "react-router-dom";
import Header from "../../../components/header";
import { useSelector } from "react-redux";
import Login from "../login";
import style from "./index.module.css";
import { useState } from "react";

function AdminRoot() {
  const isLogin = useSelector((state) => state.user.isLogin);
  console.log(isLogin);

  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State for navbar

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  /*
data
  width: calc(100%-navWidth)
*/
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
