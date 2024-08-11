import React, { useState } from "react";
import style from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faRightLeft,
  faHome,
  faCircleInfo,
  faCalendarDays,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  maxHeight: "90%",
  bgcolor: "background.paper",
  border: "1px solid grey",
  boxShadow: 24,
  borderRadius: "8px",
  overflowY: "auto",
};

function AboutProfil() {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  // const [image, setImage] = useState(null);

  const [formsData, setFormsData] = useState({
    image: "",
    name: "",
    profileLink: "",
    about: "",
    email: "",
    phone: "",
    address: {
      country: "",
      city: "",
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormsData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };
  const [selectEvents, setSelectEvents] = useState("");

  const handleChangeSelectEvents = (event) => {
    setSelectEvents(event.target.value);
  };

  const [page, setPage] = useState("");

  const handleChangePage = (event) => {
    setPage(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormsData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://669b5625276e45187d352b89.mockapi.io/organization",
        formsData
      );
      console.log(response.data);
      // Optionally handle success (e.g., close the modal, reset form, etc.)
      handleClose();
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <>
      <div className={style.about}>
        <div className={style.edit}>
          <h2>About</h2>

          <FontAwesomeIcon onClick={handleOpen} icon={faPen} color="#717171" />
        </div>

        <div className={style.profil}>
          <h3>Name</h3>
          <h2>
            {user.firstName} {user.lastName}{" "}
          </h2>
        </div>

        <div className={style.desp}>
          <h6>Tell us about yourself and let people know who you are</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            tincidunt interdum nunc et auctor. Phasellus quis pharetra sapien.
            Integer ligula sem, sodales vitae varius in, varius eget augue.
          </p>
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

        <div className={style.address}>
          <h3>Address</h3>
          <p>
            {user.address.address} ,{user.address.city} ,{user.address.county}{" "}
          </p>
        </div>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
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
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid grey",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",

                    padding: "12px",
                  }}
                >
                  Organisation details
                </Typography>
                <Typography
                  onClick={handleClose}
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  style={{
                    color: "grey",
                    fontSize: "16px",
                    fontWeight: "500",
                    // borderBottom: "1px solid grey",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                >
                  X
                </Typography>
              </div>

              <FormControl
                variant="standard"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  // alignItems: "center",
                  marginTop: "16px",
                  padding: "0px 25px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "5px",
                    }}
                  >
                    Avatar*
                  </Typography>
                  <TextField
                    variant="outlined"
                    // accept="image/*"
                    name="image"
                    value={formsData.image}
                    onChange={handleInputChange}
                    style={{
                      margin: "8px",
                      width: "100%",
                      backgroundColor: "#f9f9f9",
                    }}
                  />

                  <div
                    style={{
                      border: "2px dashed #bbbbbb",
                      width: "110px",
                      height: "110px",
                      borderRadius: "50%",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    {formsData.image ? (
                      <img
                        src={formsData.image}
                        alt="uploaded"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <CameraAltIcon style={{ color: "#bbbbbb" }} />
                    )}
                  </div>
                </div>

                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="span"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    padding: "5px",
                  }}
                >
                  Name*
                </Typography>
                <TextField
                  variant="outlined"
                  name="name"
                  value={formsData.name}
                  onChange={handleInputChange}
                  style={{
                    margin: "8px",
                    width: "100%",
                    backgroundColor: "#f9f9f9",
                  }}
                />
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="span"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    padding: "5px",
                  }}
                >
                  Profile Link*
                </Typography>
                <TextField
                  variant="outlined"
                  name="profileLink"
                  value={formsData.profileLink}
                  onChange={handleInputChange}
                  style={{
                    margin: "8px",
                    width: "100%",
                    backgroundColor: "#f9f9f9",
                  }}
                />
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="span"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    padding: "5px",
                  }}
                >
                  About*
                </Typography>
                <TextField
                  variant="outlined"
                  name="about"
                  value={formsData.about}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  style={{
                    margin: "8px",
                    width: "100%",
                    backgroundColor: "#f9f9f9",
                  }}
                />

                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="span"
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        padding: "5px",
                      }}
                    >
                      Email*
                    </Typography>
                    <TextField
                      variant="outlined"
                      name="email"
                      value={formsData.email}
                      onChange={handleInputChange}
                      style={{
                        margin: "8px",
                        width: "100%",
                        backgroundColor: "#f9f9f9",
                      }}
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="span"
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        padding: "5px",
                      }}
                    >
                      Phone*
                    </Typography>
                    <TextField
                      variant="outlined"
                      name="phone"
                      value={formsData.phone}
                      onChange={handleInputChange}
                      style={{
                        margin: "8px",
                        width: "100%",
                        backgroundColor: "#f9f9f9",
                      }}
                    />
                  </Grid>
                </Grid>
              </FormControl>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                style={{
                  width: "95%",
                  margin: "10px auto",
                  fontSize: "18px",
                  fontWeight: "500",
                  borderBottom: "2px solid #bbbbbb",
                  padding: "10px",

                  marginBottom: "20px",
                }}
              >
                Address
              </Typography>
              <FormControl
                variant="standard"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: "16px",
                  padding: "0px 25px",
                }}
              >
                <Grid container spacing={3}>
                  <Grid xs={12} md={12}>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="span"
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        padding: "5px",
                      }}
                    >
                      Address*
                    </Typography>
                    <TextField
                      name="address"
                      value={formsData.address.address}
                      onChange={handleAddressChange}
                      variant="outlined"
                      style={{
                        margin: "8px",
                        width: "100%",
                        backgroundColor: "#f9f9f9",
                      }}
                    />
                  </Grid>

                  <Grid xs={12} md={12}>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="span"
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        padding: "5px",
                      }}
                    >
                      Country*
                    </Typography>
                    <TextField
                      name="country"
                      value={formsData.address.country}
                      onChange={handleAddressChange}
                      variant="outlined"
                      style={{
                        margin: "8px",
                        width: "100%",
                        backgroundColor: "#f9f9f9",
                      }}
                    />
                  </Grid>
                  <Grid xs={12} md={12}>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="span"
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        padding: "5px",
                      }}
                    >
                      City/Suburb*
                    </Typography>
                    <TextField
                      name="country"
                      value={formsData.address.country}
                      onChange={handleAddressChange}
                      variant="outlined"
                      style={{
                        margin: "8px",
                        width: "100%",
                        backgroundColor: "#f9f9f9",
                      }}
                    />
                  </Grid>
                </Grid>
              </FormControl>
              <div
                style={{ borderTop: "2px solid #bbbbbb", textAlign: "right" }}
              >
                <button onClick={handleClose} className={style.cancel}>
                  Cancel
                </button>
                <button onClick={handleSubmit} className={style.add}>
                  Add
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}

export default AboutProfil;
