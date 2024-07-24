import { Link } from "react-router-dom";
import style from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faCalendarDays,
  faRectangleAd,
  faAddressCard,
  faCreditCard,
  faChartPie,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
function Navbar({ isNavbarOpen }) {
  return (
    <>
      <div
        className={`${style.nav} ${
          isNavbarOpen ? style.navOpen : style.navClosed
        }`}
      >
        <ul className={style.links}>
          <li>
            <Link to="/admin" className={style.link}>
              <FontAwesomeIcon icon={faGauge} />
              {isNavbarOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/events" className={style.link}>
              <FontAwesomeIcon icon={faCalendarDays} />
              {isNavbarOpen && <span>Events</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/promotion" className={style.link}>
              <FontAwesomeIcon icon={faRectangleAd} />
              {isNavbarOpen && <span>Promotion</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/contactList" className={style.link}>
              <FontAwesomeIcon icon={faAddressCard} />
              {isNavbarOpen && <span>Contact List</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/payouts" className={style.link}>
              {" "}
              <FontAwesomeIcon icon={faCreditCard} />
              {isNavbarOpen && <span>Payouts</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/reports" className={style.link}>
              <FontAwesomeIcon icon={faChartPie} />
              {isNavbarOpen && <span>Reports</span>}
            </Link>
          </li>

          <li>
            <Link to="/admin/about" className={style.link}>
              <FontAwesomeIcon icon={faCircleInfo} />
              {isNavbarOpen && <span>About</span>}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
