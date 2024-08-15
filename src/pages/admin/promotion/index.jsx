import style from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleAd,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
// import CustomFilterDemo from "../../../components/dataTableEvents";
import React, { useEffect, useRef, useState } from "react";
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
import imgLogo from "../../../assets/images/eventsModal/logo.png";
import axios from "axios";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  maxHeight: "90%",
  bgcolor: "background.paper",
  border: "1px solid grey",
  boxShadow: 24,
  borderRadius: "8px",
  overflowY: "auto",
};

function Promotion() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null);
  const searchInput = useRef(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    if (!token) {
      setError(new Error("No token found, please log in again."));
      setLoading(false);
      return;
    }

    axios("http://localhost:5011/api/Coupon/getCoupon", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data.result);
        const formattedData = res.data.result.map((item, index) => ({
          ...item,
          key: index, // Or use another unique identifier
        }));
        setData(formattedData);
        // setData(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // Handle unauthorized error
          setError(new Error("Unauthorized access. Please log in again."));
          localStorage.removeItem("userInfo"); // Clear invalid token
          // Optionally, redirect to the login page
        } else {
          setError(err);
        }
        setLoading(false);
      });
    return () => {};
  }, []);

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
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "30%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: "20%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: "20%",
      ...getColumnSearchProps("discount"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "20%",
      ...getColumnSearchProps("price"),
    },
    {
      title: "DiscountEnd",
      dataIndex: "discountEnd",
      key: "discountEnd",
      width: "20%",
      ...getColumnSearchProps("discountEnd"),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: "20%",
      ...getColumnSearchProps("time"),
    },
    {
      title: "Edit",
      // dataIndex: "edit",
      key: "edit",
      // width: "20%",
      render: (_, record) => (
        <Button
          type="primary"
          style={{
            marginRight: 8,
            backgroundColor: "yellow",
            borderColor: "yellow",
            color: "black",
          }}
          onClick={() => handleEdit(record)}
        >
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      // dataIndex: "delete",
      key: "delete",
      // width: "20%",
      render: (_, record) => (
        <Button
          type="danger"
          style={{
            backgroundColor: "#f5222d",
            borderColor: "#f5222d",
            color: "white",
          }}
          onClick={() => handleDelete(record)}
        >
          Delete
        </Button>
      ),
    },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    //   ...getColumnSearchProps("address"),
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ["descend", "ascend"],
    // },
  ];

  const handleEdit = (record) => {
    // Handle the edit action
    // For example, you might want to show a modal with a form to edit the record
    console.log("Edit record:", record);
  };

  const handleDelete = (record) => {
    // Handle the delete action
    // You might want to show a confirmation modal and then perform the deletion
    console.log("Delete record:", record);

    // Example delete API request
    // const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    // axios
    //   .delete(`http://localhost:5011/api/Event/events/${record.id}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then(() => {
    //     // Remove the deleted record from the data state
    //     setData(data.filter((item) => item.id !== record.id));
    //   })
    //   .catch((err) => {
    //     console.error("Error deleting record:", err);
    //   });
  };

  // modal

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <>
      <div className={style.eventsPages}>
        <div className={style.events}>
          <FontAwesomeIcon
            icon={faRectangleAd}
            style={{ marginRight: "12px" }}
          />
          Promotion
        </div>

        <div className={style.eventsAndSearch}>
          <div className={style.title}>
            <h5>Coupons (1)</h5>
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
                  placeholder="Search by coupons name"
                  style={{ border: "none", marginLeft: "25px" }}
                />
              </InputGroup>
            </div>
            <div className={style.btns}>
              <button onClick={handleOpen}>Create Coupon</button>
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
                  borderBottom: "1px solid #efefef",
                  padding: "12px",
                }}
              >
                Create Your Coupon
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

            <div style={{ display: "flex" }}>
              <div style={{ margin: "55px auto" }}>
                <img src={imgLogo} alt="logo" />
              </div>
            </div>

            <FormControl
              variant="standard"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                // alignItems: "center",
                margin: "16px",
                padding: "0px 25px",
                borderTop: "2px dashed #efefef",
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
                Name*
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
                Code*
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
                    Discount*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="discount"
                    type="number"
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
                    Price*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="price"
                    type="number"
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
                    Discount End*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="discount"
                    type="datetime-local"
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
                    Time*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="price"
                    type="datetime-local"
                    // value={formsData.phone}
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

export { Promotion };
