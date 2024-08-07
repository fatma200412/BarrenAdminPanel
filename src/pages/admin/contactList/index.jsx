import style from "./index.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faMagnifyingGlass,
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
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Grid from "@mui/system/Unstable_Grid";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

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

function ContactList() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [description, setDescription] = useState("");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />

        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{
            width: 90,
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{
            width: 90,
          }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({
              closeDropdown: false,
            });
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
          }}
        >
          Filter
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          close
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  // modal

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className={style.eventsPages}>
        <div className={style.events}>
          <FontAwesomeIcon
            icon={faAddressCard}
            style={{ marginRight: "12px" }}
          />
          Contact Lists
        </div>

        <div className={style.eventsAndSearch}>
          <div className={style.title}>
            <h5>Contact Lists (2)</h5>
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
                  placeholder="Search by name"
                  style={{ border: "none", marginLeft: "25px" }}
                />
              </InputGroup>
            </div>
            <div className={style.btns}>
              <button onClick={handleOpen}>Create Contact List</button>
            </div>
          </div>
        </div>

        <div className={style.dataTables}>
          {/* <CustomFilterDemo /> */}
          <Table
            columns={columns}
            dataSource={data}
            style={{ clear: "none" }}
          />
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
                padding: "12px",
              }}
            >
              Create New List
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
                List Name*
              </Typography>
              <TextField
                variant="outlined"
                name="code"
                // value={formsData.name}
                // onChange={handleInputChange}
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
                How you know them*
              </Typography>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                style={{
                  margin: "8px",
                  width: "100%",
                  backgroundColor: "#f9f9f9",
                }}
              />
              {/* <TextField
                variant="outlined"
                name="about"
                // value={formsData.about}
                // onChange={handleInputChange}
                multiline
                rows={4}
                style={{
                  margin: "8px",
                  width: "100%",
                  backgroundColor: "#f9f9f9",
                }}
              /> */}

              <Typography
                id="transition-modal-title"
                variant="h6"
                component="span"
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  padding: "5px",
                  borderBottom: "1px solid #efefef",
                  margin: "15px 0px",
                }}
              >
                Add Contacts
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
                    First Name*
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
                    Last Name*
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
                    Email*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="discount"
                    type="email"
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
              <button className={style.add}>Add</button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default ContactList;
