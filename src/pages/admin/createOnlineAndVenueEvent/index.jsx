import React, { useState } from "react";
import style from "./index.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideoCamera,
  faRightLong,
  faLocationDot,
  faInfo,
  faInfoCircle,
  faTicket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/system/Unstable_Grid";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import ReactQuill from "react-quill";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import axios from "axios";

function CreateOnlineAndVenueEvent() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventType = searchParams.get("type");

  const [currentStep, setCurrentStep] = useState(1);
  const [detailsFormData, setDetailsFormData] = useState({
    name: "",
    categoryName: "",
    eventDate: "",
    beginTime: "",
    endTime: "",
    image: {
      imageUrl: null,
      description: "",
    },
    addres: "",
    city: "",
    country: "",
    eventTypeId: eventType === "online" ? 1 : 2,
  });
  const [eventId, setEventId] = useState(null);

  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null);

  const [ticketDetails, setTicketDetails] = useState({});

  const steps = [
    { id: 1, name: "Details" },
    { id: 2, name: "Tickets" },
  ];

  const handleNext = async () => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    console.log(token);

    if (!token) {
      setError(new Error("No token found, please log in again."));
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Attach token in the Authorization header
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5011/api/Event/event",
        detailsFormData,
        config
      );
      const { id } = response.data;
      console.log(id);
      setEventId(id);
      // Navigate to the next step
    } catch (error) {
      if (error.response) {
        console.error("Response Error Data:", error.response.data);
        console.error("Response Status:", error.response.status);
        console.error("Response Headers:", error.response.headers);
      } else {
        console.error("Error", error.message);
      }
    }
    console.log(detailsFormData);
    setCurrentStep((prevStep) =>
      prevStep < steps.length ? prevStep + 1 : prevStep
    );
  };
  console.log(eventId);

  const handleBack = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <DetailsForm
            detailsFormData={detailsFormData}
            setDetailsFormData={setDetailsFormData}
          />
        );
      case 2:
        return <TicketsForm />;
      default:
        return <DetailsForm />;
    }
  };

  const handleTicketSubmit = async () => {
    try {
      const ticketData = {
        ...ticketDetails,
        eventId: eventId, // Use the stored event ID
      };
      // Replace with your API call
      await axios.post(
        `http://localhost:5011/api/Ticket/AddTicket/ticket/${eventId}`,
        ticketData
      );
      // Proceed to the next step
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

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

        <div className={style.stepper}>
          <div className={style.stepAndName}>
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`${style.step} ${
                  currentStep === step.id ? style.activeStep : ""
                }`}
                onClick={() => handleStepClick(step.id)}
              >
                <div className={style.circle}>
                  {currentStep > step.id ? "✓" : index + 1}
                </div>
                <div className={style.stepName}>{step.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={style.stepContent}>{renderStepContent()}</div>

        <div className={style.navigationButtons}>
          {currentStep > 1 && (
            <button onClick={handleBack} className={style.backButton}>
              Back
            </button>
          )}
          {currentStep < steps.length && (
            <button onClick={handleNext} className={style.nextButton}>
              Next
            </button>
          )}
          {currentStep === steps.length && (
            <button
              type="submit"
              onClick={handleTicketSubmit}
              className={style.submitButton}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </>
  );
}
function DetailsForm({ detailsFormData, setDetailsFormData }) {
  const theme = useTheme();
  // const [categoryName, setCategoryName] = useState("");
  // const [eventName, setEventName] = useState("");
  // const [beginTime, setBeginTime] = useState("");
  // const [endTime, setEndTime] = useState("");

  const [imageUrl, setImageUrl] = useState(null);

  // const [description, setDescription] = useState("");
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [email, setEmail] = useState("");

  const handleCategoryChange = (event) => {
    setDetailsFormData((prevData) => ({
      ...prevData,
      categoryName: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDetailsFormData((prevData) => ({
          ...prevData,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      // Cleanup after reading file
      reader.onerror = () => reader.abort();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetailsFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleQuillChange = (value) => {
    setDetailsFormData((prevState) => ({ ...prevState, description: value }));
  };

  return (
    <div>
      <h2 className={style.detailPageTitle}>
        {" "}
        <FontAwesomeIcon
          icon={faInfoCircle}
          style={{ paddingRight: "10px" }}
        />{" "}
        Details
      </h2>
      <div className={style.formsSection}>
        <FormControl
          variant="standard"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "center",
            margin: "10px",
            padding: "0px 15px",
          }}
        >
          <Grid container spacing={3} style={{ marginBottom: "10px" }}>
            <Grid
              xs={12}
              style={{ borderBottom: "1px solid #d6d6d6", padding: "10px" }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h6"
                style={{
                  fontSize: "16px",
                  fontWeight: "500 !important",
                }}
              >
                Give your event a name.*
              </Typography>
              <br />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h6"
                style={{
                  fontSize: "14px",
                  fontWeight: "400 !important",
                  color: "#717171",
                  marginBottom: "15px",
                }}
              >
                See how your name appears on the event page and a list of all
                places where your event name will be used.{" "}
                <button
                  style={{
                    border: "none",
                    backgroundColor: "white",
                    color: "#6ac045",
                  }}
                >
                  Learn more
                </button>
              </Typography>

              <TextField
                variant="outlined"
                placeholder="Enter event name here"
                name="name"
                type="text"
                value={detailsFormData.name}
                onChange={handleInputChange}
                style={{
                  marginBottom: "8px",
                  width: "100%",
                  backgroundColor: "#f9f9f9",
                }}
              />
            </Grid>
            <Grid
              xs={12}
              style={{ borderBottom: "1px solid #d6d6d6", padding: "10px" }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h6"
                style={{
                  fontSize: "16px",
                  fontWeight: "500 !important",
                }}
              >
                Choose a category for your event.*
              </Typography>
              <br />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h6"
                style={{
                  fontSize: "14px",
                  fontWeight: "400 !important",
                  color: "#717171",
                  marginBottom: "15px",
                }}
              >
                Choosing relevant categories helps to improve the
                discoverability of your event.
                <button
                  style={{
                    border: "none",
                    backgroundColor: "white",
                    color: "#6ac045",
                  }}
                >
                  Learn more
                </button>
              </Typography>

              <div>
                <Select
                  style={{
                    border: "1px solid grey",
                    marginBottom: "8px",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={detailsFormData.categoryName}
                  onChange={handleCategoryChange}
                >
                  <MenuItem value={"1"}>Arts</MenuItem>
                  <MenuItem value={"2"}>Business</MenuItem>
                  <MenuItem value={"3"}>Education and Training</MenuItem>
                  <MenuItem value={"4"}>Family and Friends</MenuItem>
                  <MenuItem value={"5"}>Food and Drink</MenuItem>
                  <MenuItem value={"6"}>Government and Politics</MenuItem>
                  <MenuItem value={"7"}>Health and Wellbeing</MenuItem>
                  <MenuItem value={"8"}>Hobbies and Interest</MenuItem>
                  <MenuItem value={"9"}>Music and Theater</MenuItem>
                  <MenuItem value={"10"}>Science and Technology</MenuItem>
                  <MenuItem value={"11"}>Sports and Fitness</MenuItem>
                  <MenuItem value={"13"}>Travel and Outdoor</MenuItem>
                  <MenuItem value={"14"}>Community and Culture</MenuItem>
                  <MenuItem value={"15"}>Coaching and Consulting</MenuItem>
                  <MenuItem value={"16"}>Others</MenuItem>
                </Select>
              </div>
            </Grid>
            <Grid
              xs={12}
              style={{ borderBottom: "1px solid #d6d6d6", padding: "10px" }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h6"
                style={{
                  fontSize: "16px",
                  fontWeight: "500 !important",
                }}
              >
                When is your event?*
              </Typography>
              <br />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h6"
                style={{
                  fontSize: "14px",
                  fontWeight: "400 !important",
                  color: "#717171",
                  marginBottom: "15px",
                }}
              >
                Tell your attendees when your event starts so they can get ready
                to attend.
              </Typography>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} style={{ width: "50%" }}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h6"
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "15px",
                    }}
                  >
                    Event Date*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="eventDate"
                    type="datetime-local"
                    value={detailsFormData.eventDate}
                    onChange={handleInputChange}
                    style={{
                      // margin: "8px",
                      width: "100%",
                      backgroundColor: "#f9f9f9",
                      marginBottom: "15px",
                    }}
                  />
                </Grid>
                <Grid xs={12} md={6} style={{ width: "50%" }}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h6"
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "15px",
                    }}
                  >
                    Begin Time*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="beginTime"
                    type="datetime-local"
                    value={detailsFormData.beginTime}
                    onChange={handleInputChange}
                    style={{
                      // margin: "8px",
                      width: "100%",
                      backgroundColor: "#f9f9f9",
                      marginBottom: "15px",
                    }}
                  />
                </Grid>
                <Grid xs={12} md={6} style={{ width: "50%" }}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h6"
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "15px",
                    }}
                  >
                    End Time*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="endTime"
                    type="datetime-local"
                    value={detailsFormData.endTime}
                    onChange={handleInputChange}
                    style={{
                      marginBottom: "15px",
                      width: "100%",
                      backgroundColor: "#f9f9f9",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid xs={12} md={12}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h6"
                style={{
                  fontSize: "16px",
                  fontWeight: "500 !important",
                }}
              >
                Add a few images to your event banner.
              </Typography>
              <br />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h6"
                style={{
                  fontSize: "14px",
                  fontWeight: "400 !important",
                  color: "#717171",
                  marginBottom: "15px",
                }}
              >
                Upload colorful and vibrant images as the banner for your event!
                See how beautiful images help your event details page.
                <button
                  style={{
                    border: "none",
                    backgroundColor: "white",
                    color: "#6ac045",
                  }}
                >
                  Learn more
                </button>
              </Typography>
              <div className={style.imageInput}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={style.inpImage}
                  // style={{
                  //   padding: "10px",
                  //   margin: "10px 0",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   display: "block",
                  // }}
                />
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </div>
            </Grid>

            <Grid xs={12} md={12} style={{ borderBottom: "1px solid #d6d6d6" }}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h6"
                style={{
                  fontSize: "16px",
                  fontWeight: "500 !important",
                }}
              >
                Please describe your event.
              </Typography>
              <br />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h6"
                style={{
                  fontSize: "14px",
                  fontWeight: "400 !important",
                  color: "#717171",
                  marginBottom: "15px",
                }}
              >
                Write a few words below to describe your event and provide any
                extra information such as schedules, itinerary or any special
                instructions required to attend your event.
              </Typography>
              <ReactQuill
                theme="snow"
                name="description"
                value={detailsFormData.description}
                onChange={handleQuillChange}
                style={{
                  margin: "8px",
                  width: "100%",
                  backgroundColor: "#f9f9f9",
                }}
              />
            </Grid>
          </Grid>

          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h6"
            style={{
              fontSize: "16px",
              fontWeight: "500 !important",
            }}
          >
            Where is your event taking place? *
          </Typography>
          <br />
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h6"
            style={{
              fontSize: "14px",
              fontWeight: "400 !important",
              color: "#717171",
              marginBottom: "15px",
            }}
          >
            Add a venue to your event to tell your attendees where to join the
            event.
          </Typography>

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
                Country*
              </Typography>
              <TextField
                variant="outlined"
                name="country"
                value={detailsFormData.country}
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
                City*
              </Typography>
              <TextField
                variant="outlined"
                name="city"
                value={detailsFormData.city}
                onChange={handleInputChange}
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
                Address*
              </Typography>
              <TextField
                variant="outlined"
                name="addres"
                value={detailsFormData.addres}
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
      </div>
    </div>
  );
}

function TicketsForm() {
  const [ticketData, setTicketData] = useState({
    ticketPrice: 0,
    ticketQuantity: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className={style.detailPageTitle}>
        {" "}
        <FontAwesomeIcon
          icon={faTicket}
          style={{ paddingRight: "10px" }}
        />{" "}
        Tickets
      </h2>

      <div className={style.formsSection}>
        <FormControl
          variant="standard"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "center",
            margin: "10px",
            padding: "0px 15px",
          }}
        >
          <Grid container spacing={3} style={{ marginBottom: "10px" }}>
            <Grid xs={12} style={{ padding: "10px" }}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h6"
                style={{
                  fontSize: "16px",
                  fontWeight: "500 !important",
                }}
              >
                Let's create tickets!
              </Typography>
              <br />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h6"
                style={{
                  fontSize: "14px",
                  fontWeight: "400 !important",
                  color: "#717171",
                  marginBottom: "15px",
                }}
              >
                Add the ticket price and the number of your attendees. For free
                events, keep the price at $0.
              </Typography>

              <Grid container spacing={3}>
                <Grid xs={12} md={6} style={{ width: "50%" }}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h6"
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "15px",
                    }}
                  >
                    Price*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="ticketPrice"
                    type="number"
                    value={ticketData.ticketPrice}
                    onChange={handleInputChange}
                    style={{
                      // margin: "8px",
                      width: "100%",
                      backgroundColor: "#f9f9f9",
                      marginBottom: "15px",
                    }}
                  />
                </Grid>
                <Grid xs={12} md={6} style={{ width: "50%" }}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h6"
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "15px",
                    }}
                  >
                    Total number of tickets available*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="ticketQuantity"
                    type="number"
                    value={ticketData.ticketQuantity}
                    onChange={handleInputChange}
                    style={{
                      marginBottom: "15px",
                      width: "100%",
                      backgroundColor: "#f9f9f9",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      </div>
    </div>
  );
}

export default CreateOnlineAndVenueEvent;
