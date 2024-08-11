import style from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faArrowTrendUp,
  faMoneyBill,
  faBox,
  faEye,
  faTicket,
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 260,
      overflowY: "auto",
      position: "absolute",
      transform: "none",
    },
  },
};

function getStyles(name, country, theme) {
  return {
    fontWeight:
      country.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const data = [
  { name: "Mon", value: 5 },
  { name: "Tue", value: 9 },
  { name: "Wed", value: 7 },
  { name: "Thu", value: 8 },
  { name: "Fri", value: 6 },
  { name: "Sat", value: 4 },
  { name: "Sun", value: 8 },
];

function Dashboard() {
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
      <div className={style.dashboardPage}>
        <div className={style.dash}>
          <FontAwesomeIcon icon={faGauge} style={{ marginRight: "12px" }} />
          Dashboard
        </div>
        <div className={style.user}>
          <div className={style.about}>
            <div className={style.image}>
              <img src={user.image} alt="user" />
            </div>
            <div className={style.title}>
              <h6>
                {user.firstName} {user.lastName}
              </h6>
              <p>My Organisation</p>
            </div>
          </div>
          <div className={style.orgaBtn}>
            <button onClick={handleOpen}>
              <span>+</span> Add Organisation
            </button>
          </div>
        </div>

        <div className={style.events}>
          <div className={style.eventsHeader}>
            <div className={style.times}>
              <button>
                <ChevronLeftIcon />
              </button>
              <button>
                <ChevronRightIcon />
              </button>
              <p>
                <span>1st April, 2022</span> - <span>30th April, 2022</span>{" "}
              </p>
            </div>
            <div className={style.selectEvents}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Selected Events
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectEvents}
                  onChange={handleChangeSelectEvents}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={style.eventsCards}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={3} md={6} sm={12}>
                <Card sx={{ display: "flex" }} className={style.revenue}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography
                        component="p"
                        variant="p"
                        className={style.par1}
                      >
                        REVENUE (AUD)
                      </Typography>

                      <Typography
                        variant="p"
                        component="p"
                        className={style.par2}
                      >
                        $550.00
                      </Typography>
                      <Typography
                        variant="p"
                        component="p"
                        className={style.par3}
                      >
                        <FontAwesomeIcon icon={faArrowTrendUp} /> 0.00% From
                        Previous Period
                      </Typography>
                    </CardContent>
                  </Box>
                  <div className={style.iconBack}>
                    <FontAwesomeIcon
                      icon={faMoneyBill}
                      className={style.icon}
                    />
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} lg={3} md={6} sm={12}>
                <Card sx={{ display: "flex" }} className={style.orders}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography
                        component="p"
                        variant="p"
                        className={style.par1}
                      >
                        ORDERS
                      </Typography>

                      <Typography
                        variant="p"
                        component="p"
                        className={style.par2}
                      >
                        2
                      </Typography>
                      <Typography
                        variant="p"
                        component="p"
                        className={style.par3}
                      >
                        <FontAwesomeIcon icon={faArrowTrendUp} /> 0.00% From
                        Previous Period
                      </Typography>
                    </CardContent>
                  </Box>
                  <div className={style.iconBack}>
                    <FontAwesomeIcon icon={faBox} className={style.icon} />
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} lg={3} md={6} sm={12}>
                <Card sx={{ display: "flex" }} className={style.pageView}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography
                        component="p"
                        variant="p"
                        className={style.par1}
                      >
                        PAGE VIEWS
                      </Typography>

                      <Typography
                        variant="p"
                        component="p"
                        className={style.par2}
                      >
                        30
                      </Typography>
                      <Typography
                        variant="p"
                        component="p"
                        className={style.par3}
                      >
                        <FontAwesomeIcon icon={faArrowTrendUp} /> 0.00% From
                        Previous Period
                      </Typography>
                    </CardContent>
                  </Box>
                  <div className={style.iconBack}>
                    <FontAwesomeIcon icon={faEye} className={style.icon} />
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} lg={3} md={6} sm={12}>
                <Card sx={{ display: "flex" }} className={style.ticketSales}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography
                        component="p"
                        variant="p"
                        className={style.par1}
                      >
                        TICKET SALES
                      </Typography>

                      <Typography
                        variant="p"
                        component="p"
                        className={style.par2}
                      >
                        3
                      </Typography>
                      <Typography
                        variant="p"
                        component="p"
                        className={style.par3}
                      >
                        <FontAwesomeIcon icon={faArrowTrendUp} /> 0.00% From
                        Previous Period
                      </Typography>
                    </CardContent>
                  </Box>
                  <div className={style.iconBack}>
                    <FontAwesomeIcon icon={faTicket} className={style.icon} />
                  </div>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={style.selectOptionDiagram}>
          <div className={style.selecetOption}>
            <div className={style.input}>
              <FormControl sx={{ m: 2, minWidth: 150 }}>
                <Select
                  style={{ height: "50px" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={page}
                  onChange={handleChangePage}
                >
                  <MenuItem value={"Revenue"}>Revenue</MenuItem>
                  <MenuItem value={"Orders"}>Orders</MenuItem>
                  <MenuItem value={"Page View"}>Page Views</MenuItem>
                  <MenuItem value={"Ticket Sales"}>Ticket Sales</MenuItem>
                </Select>
              </FormControl>
              <p>See the graphical representation below</p>
            </div>
            <div className={style.btns}>
              <button>Monthly</button>
              <button>Weekly</button>
              <button>Dailty</button>
            </div>
          </div>
          <div className={style.diagram}>
            {/* {data && data.length > 0 && (
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="5 5" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </LineChart>
              </ResponsiveContainer>
            )} */}
            <LineChart
              // maxHeight={1200}
              width={800}
              height={350}
              series={[
                {
                  data: data.map((d) => d.value),
                  area: true,
                },
              ]}
              xAxis={[
                {
                  scaleType: "point",
                  data: data.map((d) => d.name),
                },
              ]}
            />

            {/* <LineGragh /> */}
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

export default Dashboard;
