import style from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPen,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TextField from "@mui/material/TextField";
import Grid from "@mui/system/Unstable_Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@emotion/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { LineChart } from "@mui/x-charts/LineChart";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { LineGragh } from "../../../components/chartjs/Line";

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

function About() {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  console.log(user);
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
      <div className={style.aboutPage}>
        <div className={style.dash}>
          <FontAwesomeIcon
            icon={faCircleInfo}
            style={{ marginRight: "12px" }}
          />
          About My Organisation
        </div>

        <div className={style.about}>
          <div className={style.edit}>
            <h2>About</h2>
            <FontAwesomeIcon icon={faPen} color="#717171"/>
          </div>

          <div className={style.profil}>
            <div className={style.profilImage}>
              <img src={user.profilImage} alt="profil" />
            </div>
            <h2>
              {user.firstName} {user.lastName}{" "}
              <FontAwesomeIcon icon={faCircleCheck} color="#88cd6a" />
            </h2>
            <p>{user.email}</p>
          </div>
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  borderBottom: "1px solid grey",
                  padding: "12px",
                }}
              >
                Organisation details
              </Typography>
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

export default About;
