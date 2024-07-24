import { Outlet } from "react-router-dom";
import Header from "../../../components/header";

function AdminRoot() {
  return (
    <div>
      <Header />
      {/* <Navbar /> */}
      <Outlet />
    </div>
  );
}

export default AdminRoot;
