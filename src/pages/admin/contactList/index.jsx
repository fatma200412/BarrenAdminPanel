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
import React, { useRef, useState, useEffect } from "react";
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
import axios from "axios";

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
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    listName: "",
    description: "",
    firstName: "",
    lastName: "",
    email: "",
    userId: 0,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchData = () => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    if (!token) {
      setError(new Error("No token found, please log in again."));
      setLoading(false);
      return;
    }

    axios("http://localhost:5011/api/ContactList/getList", {
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
        const highestUserId = Math.max(
          ...formattedData.map((item) => item.id),
          0
        );

        // Set the userId for new records to be highestUserId + 2
        setFormData((prevFormData) => ({
          ...prevFormData,
          userId: highestUserId + 2,
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
      title: "List Name",
      dataIndex: "listName",
      key: "listName",
      width: "30%",
      sorter: (a, b) => a?.listName?.localeCompare(b?.listName),
      ...getColumnSearchProps("listName"),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "20%",
      sorter: (a, b) => a?.firstName?.localeCompare(b?.firstName),
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "20%",
      sorter: (a, b) => a?.lastName?.localeCompare(b?.lastName),
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      sorter: (a, b) => a?.email?.localeCompare(b?.email),

      ...getColumnSearchProps("email"),
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
    console.log("Delete record:", record);

    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    axios
      .delete(
        `http://localhost:5011/api/ContactList/DeleteContactList/${record.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setData(data.filter((item) => item.id !== record.id));
      })
      .catch((err) => {
        console.error("Error deleting record:", err);
      });
  };

  const parseHtmlToText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  // modal

  // post

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setFormData((prevState) => ({ ...prevState, description: value }));
  };

  const handleSubmitData = () => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    if (!token) {
      console.error("No token found");
      return;
    }
    if (!isEdit) {
      // Find the highest userId from the current data
      const highestUserId = Math.max(...data.map((item) => item.id), 0);

      console.log(+highestUserId + 2);
      // Set the userId for the new record to be highestUserId + 2
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: +highestUserId + 2,
      }));
    }

    const dataToSubmit = {
      ...formData,
      description: parseHtmlToText(formData.description),
    };
    console.log(dataToSubmit);

    const request = isEdit
      ? axios.put(
          `http://localhost:5011/api/ContactList/UpdateContactList/${formData.id}`,
          dataToSubmit,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      : axios.post(
          "http://localhost:5011/api/ContactList/contactList",
          dataToSubmit,
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
        } else {
          // setData([...data, { ...updatedCoupon, key: data.length }]);
          fetchData();
        }
        setOpen(false);
        setFormData({
          listName: "",
          description: "",
          firstName: "",
          lastName: "",
          email: "",
          userId: 0,
        });

        // fetchData();
        // setOpen(false);
        // setFormData({
        //   listName: "",
        //   description: "",
        //   firstName: "",
        //   lastName: "",
        //   email: "",
        // });
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
      listName: "",
      description: "",
      firstName: "",
      lastName: "",
      email: "",
      userId: 0,
    });
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => {
    setFormData({
      listName: "",
      description: "",
      firstName: "",
      lastName: "",
      email: "",
    });
    setOpen(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  const handleSearchByListName = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item?.listName?.toLowerCase().includes(searchText.toLowerCase())
  );

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
            <h5>Contact Lists ({filteredData.length})</h5>
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
                  placeholder="Search by name"
                  value={searchText}
                  onChange={handleSearchByListName}
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
                {isEdit ? "Edit List" : "Create New List"}
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
                name="listName"
                value={formData.listName}
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
                How you know them*
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
                    name="firstName"
                    value={formData.firstName}
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
                    Last Name*
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="lastName"
                    value={formData.lastName}
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
                    name="email"
                    type="email"
                    value={formData.email}
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
                {isEdit ? "Save Changes" : "Add"}
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export { ContactList };
