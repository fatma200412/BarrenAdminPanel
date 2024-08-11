import React, { useState } from "react";
import style from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faRightLeft,
  faHome,
  faCircleInfo,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";
import HomeProfil from "../../../components/profilnaviget/home";
import AboutProfil from "../../../components/profilnaviget/about";
import MyOrdersProfil from "../../../components/profilnaviget/myOrders";

function MyProfile() {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeProfil />;
      case "about":
        return <AboutProfil />;
      case "myOrders":
        return <MyOrdersProfil />;
      default:
        return <HomeProfil />;
    }
  };

  return (
    <div className={style.profilePages}>
      <div className={style.backProfil}></div>
      <div className={style.profil}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className={style.about}>
              <div className={style.profildata}>
                <div className={style.profilImage}>
                  <img src={user.image} alt="profil" />
                </div>
                <h2>
                  {user.firstName} {user.lastName}{" "}
                  <FontAwesomeIcon icon={faCircleCheck} color="#88cd6a" />
                </h2>
                <p>{user.email}</p>
              </div>

              <div className={style.organisation}>
                <h3>
                  Hey I am {user.firstName} {user.lastName}
                </h3>
                <button onClick={() => navigate("/admin")}>
                  My Organisation <FontAwesomeIcon icon={faRightLeft} />
                </button>
              </div> 

              <div className={style.findMe}>
                <h2>Find me on</h2>
                <div className={style.links}>
                  <button>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FacebookIcon />
                    </a>
                  </button>
                  <button>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InstagramIcon />
                    </a>
                  </button>
                  <button>
                    <a
                      href="https://x.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TwitterIcon />
                    </a>
                  </button>
                  <button>
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedInIcon />
                    </a>
                  </button>
                  <button>
                    <a
                      href="https://youtube.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <YouTubeIcon />
                    </a>
                  </button>
                  <button>
                    <a
                      href="https://google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LanguageIcon />
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={style.navTabs}>
              <button
                onClick={() => setActiveTab("home")}
                className={activeTab === "home" ? style.activeTab : ""}
              >
                <FontAwesomeIcon icon={faHome} /> Home
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className={activeTab === "about" ? style.activeTab : ""}
              >
                <FontAwesomeIcon icon={faCircleInfo} /> About
              </button>
              <button
                onClick={() => setActiveTab("myOrders")}
                className={activeTab === "myOrders" ? style.activeTab : ""}
              >
                <FontAwesomeIcon icon={faCalendarDays} /> My Orders
              </button>
            </div>
            <div className={style.tabContent}>{renderContent()}</div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default MyProfile;
