import { Outlet } from "react-router-dom";
import Header from "../../../components/header";
import style from "./index.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../login";
import { login } from "../../../redux/slices/adminSlice";

function AdminRoot() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      dispatch(login(userInfo));
    }
  }, [dispatch]);

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
