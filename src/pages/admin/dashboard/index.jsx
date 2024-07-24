import style from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className={style.dashboardPage}>
        <div className={style.dash}>
          <FontAwesomeIcon icon={faGauge} style={{ marginRight: "12px" }} />
          Dashboard
        </div>
        <div className={style.user}>
          <div className={style.about}>
            <div className={style.image}>
              <img
                src="https://www.gambolthemes.net/html-items/barren-html/disable-demo-link/images/profile-imgs/img-13.jpg"
                alt="user"
              />
            </div>
            <div className={style.title}>
              <h6>John Doe</h6>
              <p>My Organisation</p>
            </div>
          </div>
          <div className={style.orgaBtn}>
            <button onClick={handleOpen}>
              <span>+</span> Add Organisation
            </button>
          </div>
        </div>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={styleModal}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Text in a modal
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}

export default Dashboard;
