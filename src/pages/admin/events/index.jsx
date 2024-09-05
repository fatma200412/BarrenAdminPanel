import style from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
// import CustomFilterDemo from "../../../components/dataTableEvents";
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
// import { Input } from "antd";

import { Table } from "antd";
import ReactQuill from "react-quill";

import Highlighter from "react-highlight-words";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/system/Unstable_Grid";
import TextField from "@mui/material/TextField";

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
function Events() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null);
  const searchInput = useRef(null);
  const [eventType, setEventType] = useState(null);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    eventDate: "2024-08-20T05:46:55.234Z",
    beginTime: "2024-08-20T05:46:55.234Z",
    endTime: "2024-08-20T05:46:55.234Z",
    address: {
      country: "",
      city: "",
      addres: "",
    },
    description: "",
  });

  const fetchData = () => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    if (!token) {
      setError(new Error("No token found, please log in again."));
      setLoading(false);
      return;
    }

    let apiEndpoint = "http://localhost:5011/api/Event/events";

    if (eventType === "online") {
      apiEndpoint = "http://localhost:5011/api/Event/GetEventByTypeId/1";
    } else if (eventType === "venue") {
      apiEndpoint = "http://localhost:5011/api/Event/GetEventByTypeId/2";
    }

    axios(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("API Response:", res.data); // Log the API response
        if (!eventType) {
          const result = res.data.result || [];
          const formattedData = result.map((item, index) => ({
            ...item,
            key: index, // Or use another unique identifier
          }));
          setData(formattedData);
          setLoading(false);
        } else {
          const result = res.data || [];
          const formattedData = result.map((item, index) => ({
            ...item,
            key: index, // Or use another unique identifier
          }));
          setData(formattedData);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setError(new Error("Unauthorized access. Please log in again."));
          localStorage.removeItem("userInfo");
        } else {
          setError(err);
        }
        setLoading(false);
      });
    console.log("Event Type changed:", eventType);
  };

  useEffect(() => {
    fetchData();
  }, [eventType]);

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
      // width: "8%",
      // ...getColumnSearchProps("name"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // width: "25%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Event Date",
      dataIndex: "eventDate",
      key: "eventDate",
      // width: "15%",
      sorter: (a, b) => a?.eventDate?.localeCompare(b?.eventDate),
      ...getColumnSearchProps("eventDate"),
    },
    {
      title: "Begin Time",
      dataIndex: "beginTime",
      key: "beginTime",
      // width: "15%",
      sorter: (a, b) => a?.beginTime?.localeCompare(b?.beginTime),
      ...getColumnSearchProps("beginTime"),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      // width: "15%",
      sorter: (a, b) => a?.endTime?.localeCompare(b?.endTime),
      ...getColumnSearchProps("endTime"),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      // width: "15%",
      sorter: (a, b) => a?.duration - b?.duration,

      ...getColumnSearchProps("duration"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      // width: "14%",

      ...getColumnSearchProps("category.name"),
      render: (category) => category?.name,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      render: (address) =>
        `${address?.addres},${address?.city}, ${address?.country}`,

      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      // width: "10%",
      ...getColumnSearchProps("type"),
      render: (type) => type.name,
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
      .delete(`http://localhost:5011/api/Event/DeleteEvent/${record.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Remove the deleted record from the data state
        setData(data.filter((item) => item.id !== record.id));
      })
      .catch((err) => {
        console.error("Error deleting record:", err);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  // input search by name

  const handleSearchByName = (e) => {
    setSearchText(e.target.value);
  };

  const handleOnlineEvents = () => {
    console.log(eventType);
    console.log(data);
    setEventType("online"); // Fetch online events
  };

  const handleVenueEvents = () => {
    setEventType("venue"); // Fetch venue events
  };
  const handleAllEvents = () => {
    setEventType(null); // Fetch all events
  };
  const filteredData = data.filter((item) =>
    item?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const onlineEventsCount = data.filter(
    (item) => item.type?.name === "Online"
  ).length;
  const venueEventsCount = data.filter(
    (item) => item.type?.name === "Vanue"
  ).length;
  console.log(venueEventsCount);
  const allEventsCount = data.length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleOpen = () => {
    setFormData({
      id: null,
      name: "",
      eventDate: "2024-08-20T05:46:55.234Z",
      beginTime: "2024-08-20T05:46:55.234Z",
      endTime: "2024-08-20T05:46:55.234Z",
      address: {
        country: "",
        city: "",
        addres: "",
      },
      description: "",
    });
    setIsEdit(false);

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      eventDate: "2024-08-20T05:46:55.234Z",
      beginTime: "2024-08-20T05:46:55.234Z",
      endTime: "2024-08-20T05:46:55.234Z",
      address: {
        country: "",
        city: "",
        addres: "",
      },
      description: "",
    });
  };

  const handleSubmitData = () => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    if (!token) {
      console.error("No token found");
      return;
    }

    const dataToSubmit = {
      ...formData,
    };

    const request = isEdit
      ? axios.put(
          `http://localhost:5011/api/Event/UpdateEvent/${formData.id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      : axios.post(
          "http://localhost:5011/api/BankAccount/bankAccount/",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
          console.log(response);
        } else {
          // setData([...data, { ...response.data, key: data.length }]);
          fetchData();
        }
        setOpen(false);
        setFormData({
          name: "",
          eventDate: "2024-08-20T05:46:55.234Z",
          beginTime: "2024-08-20T05:46:55.234Z",
          endTime: "2024-08-20T05:46:55.234Z",
          address: {
            country: "",
            city: "",
            addres: "",
          },
          description: "",
        });
      })
      .catch((err) => {
        console.error("Error submitting data:", err);
      });
  };

  const handleQuillChange = (value) => {
    setFormData((prevState) => ({ ...prevState, description: value }));
  };

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
              <InputGroup className={style.input}>
                <InputLeftElement pointerEvents="none">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={style.searchIcon}
                  />
                </InputLeftElement>
                <Input
                  type="textt"
                  value={searchText}
                  onChange={handleSearchByName}
                  placeholder="Search by event name"
                  style={{ border: "none", marginLeft: "25px" }}
                />
              </InputGroup>
            </div>
            <div className={style.btns}>
              <button onClick={handleAllEvents}>
                All Events ({allEventsCount})
              </button>
              <button onClick={handleOnlineEvents}>
                Online Events ({onlineEventsCount})
              </button>
              <button onClick={handleVenueEvents}>
                Venue Events ({venueEventsCount})
              </button>
            </div>
          </div>
        </div>

        <div className={style.dataTables}>
          {/* <CustomFilterDemo /> */}
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 10 }}
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
                  padding: "15px",
                }}
              >
                {isEdit ? "Edit Account" : "Add Bank Account"}
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
                    Name*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="name"
                    value={formData.name}
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
                    Event Date*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="eventDate"
                    type="datetime-local"
                    value={formData.eventDate}
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
                    Begin Time*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="beginTime"
                    type="datetime-local"
                    value={formData.beginTime}
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
                    End Time*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="endTime"
                    type="datetime-local"
                    value={formData.endTime}
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
                    Description*
                  </Typography>
                  <ReactQuill
                    theme="snow"
                    name="description"
                    value={formData.description}
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
                component="span"
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  padding: "5px",
                  borderBottom: "1px solid #efefef",
                  margin: "15px 0px",
                }}
              >
                Address
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
                    Address*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="address"
                    value={formData.address.addres}
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
                    value={formData.address.city}
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
                    Email*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="country"
                    value={formData.address.country}
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
                {isEdit ? "Save" : "Add"}
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export { Events };
