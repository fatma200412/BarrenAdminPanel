import { Outlet } from "react-router-dom";
import Header from "../../../components/header";
import { useDispatch, useSelector } from "react-redux";
import Login from "../login";

function AdminRoot() {
  const isLogin = useSelector((state) => state.user.isLogin);
  console.log(isLogin);
  const dispatch = useDispatch();

  return (
    <div>
      {isLogin ? (
        <>
          <Header />
          {/* <Navbar /> */}
          <Outlet />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default AdminRoot;
