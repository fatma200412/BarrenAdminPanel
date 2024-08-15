import React from "react";
import style from "./index.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideoCamera,
  faRightLong,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

function CreateOnlineAndVenueEvent() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventType = searchParams.get("type");
  return (
    <>
      <div className={style.nav}>
        <nav>
          <div className={style.navlink}>
            <Link to="/admin" className={style.link}>
              Home
            </Link>
            /<Link to="/createNewEvent">Create</Link>/
            {eventType === "online"
              ? "Create Online Event"
              : "Create Venue Event"}
          </div>
        </nav>
      </div>

      <div className={style.createEventsPage}>
        <div className={style.title}>
          <h1>
            {" "}
            {eventType === "online"
              ? "Create Online Event"
              : "Create Venue Event"}
          </h1>
        </div>
        <div className={style.cards}></div>
      </div>
    </>
  );
}

export default CreateOnlineAndVenueEvent;
