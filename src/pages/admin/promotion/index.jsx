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
import { key } from "localforage";

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

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    discount: 0,
    discountType: 1 || 2,
    discountEnd: "",
    time: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const fetchData = () => {
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
  };

  useEffect(() => {
    fetchData();
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
      sorter: (a, b) => a.name?.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: "20%",
      sorter: (a, b) => a.code?.localeCompare(b.code),
      ...getColumnSearchProps("code"),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: "20%",
      sorter: (a, b) => a?.discount - b?.discount,
      ...getColumnSearchProps("discount"),
    },
    {
      title: "Price",
      // 1-de percent 2de fixed Price
      dataIndex: "discountType",
      key: "discountType",
      width: "20%",
      render: (text) => {
        switch (text) {
          case 1:
            return "$";
          case 2:
            return "%";
          default:
            return text;
        }
      },
    },
    {
      title: "DiscountEnd",
      dataIndex: "discountEnd",
      key: "discountEnd",
      width: "20%",
      sorter: (a, b) => a?.discountEnd?.localeCompare(b?.discountEnd),
      ...getColumnSearchProps("discountEnd"),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: "20%",
      sorter: (a, b) => a?.time?.localeCompare(b?.time),

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
  ];

  const handleEdit = (record) => {
    // Handle the edit action
    // For example, you might want to show a modal with a form to edit the record
    console.log("Edit record:", record);
    setFormData({ ...record });
    setIsEdit(true);
    setOpen(true);
  };

  const handleDelete = (record) => {
    // Handle the delete action
    // You might want to show a confirmation modal and then perform the deletion
    console.log("Delete record:", record);

    // Example delete API request
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    axios
      .delete(`http://localhost:5011/api/Coupon/DeleteCoupon/${record.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setData(data.filter((item) => item.id !== record.id));
      })
      .catch((err) => {
        console.error("Error deleting record:", err);
      });
  };

  // modal

  const [open, setOpen] = useState(false);

  // post

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitData = () => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    if (!token) {
      console.error("No token found");
      return;
    }

    const dataToSubmit = {
      ...formData,
      discount: Number(formData.discount),
      discountType: Number(formData.discountType),
    };

    const request = isEdit
      ? axios.put(
          `http://localhost:5011/api/Coupon/UpdateCoupon/${formData.id}`,
          dataToSubmit,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      : axios.post("http://localhost:5011/api/Coupon/coupon", dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });

    request
      .then((response) => {
        const updatedCoupon = response.data;
        console.log("API Response:", updatedCoupon);

        if (isEdit) {
          setData((prevData) =>
            prevData.map((item) =>
              item.id === formData.id
                ? { ...updatedCoupon, key: formData.id }
                : item
            )
          );
        } else {
          // setData([...data, { ...updatedCoupon, key: data.length }]);
          fetchData();
        }
        setOpen(false);
        setFormData({
          name: "",
          code: "",
          discount: 0,
          discountType: 1,
          discountEnd: "",
          time: "",
        });
      })
      .catch((err) => {
        console.error("Error submitting data:", err.message);
        if (err.response) {
          console.error("Server Response Data:", err.response.data);
          console.error("Server Response Status:", err.response.status);
          console.error("Server Response Headers:", err.response.headers);
        }
      });
  };

  const handleOpen = () => {
    setFormData({
      name: "",
      code: "",
      discount: 0,
      discountType: 1,
      discountEnd: "",
      time: "",
    });
    setOpen(true);
    setIsEdit(false);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      code: "",
      discount: 0,
      discountType: 1,
      discountEnd: "",
      time: "",
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  //input search by coupon

  const handleSearchByCouponNanme = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name?.toLowerCase().includes(searchText.toLowerCase())
  );

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
            <h5>Coupons ({filteredData.length})</h5>
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
                  type="text"
                  value={searchText}
                  onChange={handleSearchByCouponNanme}
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
            dataSource={filteredData}
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
                {isEdit ? "Edit Coupon" : "Create Your Coupon"}
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
                name="name"
                required
                value={formData.name}
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
                Code*
              </Typography>
              <TextField
                variant="outlined"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                style={{
                  margin: "8px",
                  width: "100%",
                  backgroundColor: "#f9f9f9",
                }}
                required
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
                    value={formData.discount}
                    onChange={handleInputChange}
                    style={{
                      margin: "8px",
                      width: "100%",
                      backgroundColor: "#f9f9f9",
                    }}
                    required
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
                    name="discountType"
                    type="number"
                    value={formData.discountType}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (value === 1 || value === 2 || e.target.value === "") {
                        handleInputChange(e);
                      }
                    }}
                    style={{
                      margin: "8px",
                      width: "100%",
                      backgroundColor: "#f9f9f9",
                    }}
                    required
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
                    name="discountEnd"
                    type="datetime-local"
                    value={formData.discountEnd}
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
                    Time*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="time"
                    type="datetime-local"
                    value={formData.time}
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
              <button className={style.add} onClick={handleSubmitData}>
                {isEdit ? "Save Changes" : "Add Coupon"}
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export { Promotion };
