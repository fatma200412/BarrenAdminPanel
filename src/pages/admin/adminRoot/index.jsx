import { Outlet } from "react-router-dom";
import Navbar from "../../../layout/navbar";
import Header from "../../../components/header";

function AdminRoot() {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AdminRoot;
