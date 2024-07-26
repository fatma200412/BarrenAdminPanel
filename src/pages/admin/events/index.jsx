import style from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
function Events() {
  return (
    <>
      <div className={style.eventsPages}>
        <div className={style.events}>
          <FontAwesomeIcon
            icon={faCalendarDays}
            style={{ marginRight: "12px" }}
          />
          Events
        </div>

        <div className={style.eventsAndSearch}>
          <div className={style.title}>
            <h5>Events (1)</h5>
          </div>
          <div className={style.searchAndBtns}>
            <div className={style.inputAndIcon}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <PhoneIcon color="gray.300" className={style.phoneIcon} />
                </InputLeftElement>
                <Input type="tel" placeholder="Phone number" />
              </InputGroup>
            </div>
            <div className={style.btns}>
              <button>All Events (1)</button>
              <button>Online Events (0)</button>
              <button>Venue Events</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
