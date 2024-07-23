import { Link } from "react-router-dom";
import style from "./index.module.css";

function Navbar() {
  return (
    <>
      <div className={style.nav}>
        <ul>
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/events">Events</Link>
          </li>
          <li>
            <Link to="/admin/promotion">Promotion</Link>
          </li>
          <li>
            <Link to="/admin/contactList">Contact List</Link>
          </li>
          <li>
            <Link to="/admin/payouts">Payouts</Link>
          </li>
          <li>
            <Link to="/admin/reports">Reposrt</Link>
          </li>
          <li>
            <Link to="/admin/subscription">Subscription</Link>
          </li>
          <li>
            <Link to="/admin/consetup">Conversion Setup</Link>
          </li>
          <li>
            <Link to="/admin/about">About</Link>
          </li>
          <li>
            <Link to="/admin/myteam">My Team</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
