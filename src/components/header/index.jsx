import { Link } from "react-router-dom";
import style from "./index.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/images/header/logo-icon.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import ExploreIcon from "@mui/icons-material/Explore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";

function Header() {
  let [mode, setMode] = useState(false);
  function changeMode(e) {
    setMode(!mode);
    if (!mode) {
      e.target.classList.replace("light", "dark");
      document.body.style.backgroundColor = "black";
      header.style.backgroundColor = "black";
    } else {
      e.target.classList.replace("dark", "light");
      document.body.style.backgroundColor = "white";
    }
  }
  return (
    <>
      <header className={style.header}>
        <div className="container-fluid">
          <div className={style.row}>
            <div className={style.barAndLogo}>
              <button className={style.iconBtn}>
                <MenuIcon className={style.barIcon} />
              </button>
              <Link to="/admin">
                <img className={style.logo} src={logo} alt="" />
              </Link>
              {/* <img src={logo} alt="" /> */}
            </div>

            <div className={style.iconAndBtns}>
              <div className={style.naviget}>
                <Link to="/admin/myHome" className={style.iconAndNav}>
                  <MultipleStopIcon /> My Home
                </Link>
                <a href="" className={style.iconAndNav}>
                  <ExploreIcon /> Explore Events
                </a>
                <button className={style.calendar}>
                  <CalendarMonthIcon
                    style={{
                      marginRight: "10px",
                      fontSize: "20px",
                      color: "white",
                    }}
                  />
                  Create Events
                </button>
              </div>
              <div className={style.btns}>
                <button className={`${style.btns} ${style.user} `}>
                  <AccountCircleIcon style={{ fontSize: "20px" }} />
                </button>
                <button
                  className={`${style.btns} ${style.light}`}
                  onClick={(e) => changeMode(e)}
                >
                  <Brightness7Icon style={{ fontSize: "20px" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
