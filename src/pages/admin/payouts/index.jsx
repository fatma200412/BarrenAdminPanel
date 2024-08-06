import style from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faMagnifyingGlass,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
// import CustomFilterDemo from "../../../components/dataTableEvents";
import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
// import { Input } from "antd";

import { Table } from "antd";

import Highlighter from "react-highlight-words";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import FormControl from "@mui/material/FormControl";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TextField from "@mui/material/TextField";
import Grid from "@mui/system/Unstable_Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  maxHeight: "90%",
  bgcolor: "background.paper",
  border: "1px solid grey",
  boxShadow: 24,
  borderRadius: "8px",
  overflowY: "auto",
};

function Payouts() {
  // modal

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className={style.eventsPages}>
        <div className={style.events}>
          <FontAwesomeIcon
            icon={faCreditCard}
            style={{ marginRight: "12px" }}
          />
          Payouts
        </div>

        <div className={style.eventsAndSearch}>
          <div className={style.title}>
            <h5>Added Bank Account (1)</h5>
          </div>
          <div className={style.searchAndBtns}>
            <div className={style.inputAndIcon}>
              <InputGroup className={style.input}>
                <InputLeftElement pointerEvents="none">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={style.searchIcon}
                  />
                </InputLeftElement>
                <Input
                  type="tel"
                  placeholder="Search by coupon name"
                  style={{ border: "none", marginLeft: "25px" }}
                />
              </InputGroup>
            </div>
            <div className={style.btns}>
              <button onClick={handleOpen}>Add Bank Account</button>
            </div>
          </div>
        </div>

        <div className={style.bankCards}>
          <div className={style.card}>
            <h2>Bank Name</h2>
            <h4>John Doe</h4>
            <p>****1234</p>

            <button className={style.edit} onClick={handleOpen}>
              <FontAwesomeIcon icon={faPen}  color="#717171"/>
            </button>
            <button className={style.delete}>
              <FontAwesomeIcon icon={faTrashCan} color="#717171" />
            </button>
          </div>
        
        </div>
      </div>

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
                borderBottom: "1px solid #efefef",
                padding: "15px",
              }}
            >
              Add Bank Account
            </Typography>

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
                    Account Name*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="discount"
                    // value={formsData.email}
                    // onChange={handleInputChange}
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
                    Account Number*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="price"
                    // value={formsData.phone}
                    // onChange={handleInputChange}
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
                    Bank Name*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="discount"
                    // value={formsData.email}
                    // onChange={handleInputChange}
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
                    BSB code*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="discount"
                    placeholder="XXY-ZZZ"
                    // value={formsData.email}
                    // onChange={handleInputChange}
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
                    SWIFT/BIC code*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="price"
                    // value={formsData.phone}
                    // onChange={handleInputChange}
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
                    ABA Routing*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="discount"
                    // value={formsData.email}
                    // onChange={handleInputChange}
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
                    International Bank Account Number*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="discount"
                    // value={formsData.email}
                    // onChange={handleInputChange}
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
              style={{
                borderTop: "2px solid #efefef",
                textAlign: "right",
                padding: "10px",
              }}
            >
              <button onClick={handleClose} className={style.cancel}>
                Cancel
              </button>
              <button className={style.add}>Save</button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Payouts;
