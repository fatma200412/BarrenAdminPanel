import React from "react";
import style from "./index.module.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideoCamera,
  faRightLong,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

function CreateNewEvent() {
  const navigate = useNavigate();

  const handleCreateOnlineEvent = () => {
    navigate("/createNewEvent/create?type=online");
  };

  const handleCreateVenueEvent = () => {
    navigate("/createNewEvent/create?type=venue");
  };
  return (
    <>
      <div className={style.nav}>
        <nav>
          <div className={style.navlink}>
            <Link to="/admin" className={style.link}>
              Home
            </Link>{" "}
            / Create
          </div>
        </nav>
      </div>

      <div className={style.createEventsPage}>
        <div className={style.title}>
          <h1>Create New Event</h1>
        </div>
        <div className={style.cards}>
          <div className={style.card}>
            <div className={style.icons}>
              <FontAwesomeIcon icon={faVideoCamera} />
            </div>
            <h6>Create an Online Event</h6>
            <button onClick={handleCreateOnlineEvent}>
              Create <FontAwesomeIcon icon={faRightLong} />
            </button>
          </div>
          <div className={style.card}>
            <div className={style.icons}>
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <h6>Create an Venue Event</h6>
            <button onClick={handleCreateVenueEvent}>
              Create <FontAwesomeIcon icon={faRightLong} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewEvent;
