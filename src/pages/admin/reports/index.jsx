import style from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faMagnifyingGlass,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
// import CustomFilterDemo from "../../../components/dataTableEvents";
import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
// import { Input } from "antd";

import { Table } from "antd";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Highlighter from "react-highlight-words";
import Grid from "@mui/material/Grid";
import axios from "axios";

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

function Reports() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const fetchData = async () => {

    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;


    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      console.log("Fetching data from API...");
  
      const response = await axios.get("http://localhost:5011/api/Order/orders", { headers });
      console.log("API Response:", response);
  
      if (response.status === 200) {
        return response.data.result; // Adjust based on the API response
      } else {
        console.error("Unexpected response status", response.status);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      // Optional: Display a user-friendly message or error state
    }
  };
  const handleButtonClick = async (type) => {
    const fetchedData = await fetchData();
    let columns = [];

    switch (type) {
      case "order":
        columns = [
          { title: "ID", dataIndex: "id" },
          { title: "Order Date", dataIndex: "orderDate" },
          { title: "First Name", dataIndex: ["userDetails", "firstName"] },
          { title: "Last Name", dataIndex: ["userDetails", "lastName"] },
          { title: "Status", dataIndex: "status" },
          { title: "Event Name", dataIndex: ["ticket", "event", "name"] },
        ];
        break;
      case "customer":
        columns = [
          { title: "First Name", dataIndex: ["userDetails", "firstName"] },
          { title: "Last Name", dataIndex: ["userDetails", "lastName"] },
          { title: "Email", dataIndex: ["userDetails", "email"] },
        ];
        break;
      case "ticket":
        columns = [
          { title: "Ticket ID", dataIndex: ["ticket", "id"] },
          { title: "Price", dataIndex: ["ticket", "price"] },
          { title: "Available Count", dataIndex: ["ticket", "availableCount"] },
        ];
        break;
      case "payouts":
        columns = [
          { title: "Order Date", dataIndex: "orderDate" },
          { title: "Total Amount", dataIndex: "totalAmount" },
          { title: "Status", dataIndex: "status" },
        ];
        break;
      default:
        break;
    }
    setData(fetchedData);
    setColumns(columns);
  };

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
  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //     width: "30%",
  //     ...getColumnSearchProps("name"),
  //   },
  //   {
  //     title: "Age",
  //     dataIndex: "age",
  //     key: "age",
  //     width: "20%",
  //     ...getColumnSearchProps("age"),
  //   },
  //   {
  //     title: "Address",
  //     dataIndex: "address",
  //     key: "address",
  //     ...getColumnSearchProps("address"),
  //     sorter: (a, b) => a.address.length - b.address.length,
  //     sortDirections: ["descend", "ascend"],
  //   },
  // ];

  const [allEvents, setAllEvents] = useState("");

  const handleChange = (event) => {
    setAllEvents(event.target.value);
  };

  const [allOrders, setAllOrders] = useState("");

  const handleChangeAllOrders = (event) => {
    setAllOrders(event.target.value);
  };

  const [activeOrders, setActiveOrders] = useState("");

  const handleChangeActiveOrders = (event) => {
    setActiveOrders(event.target.value);
  };
  return (
    <>
      <div className={style.eventsPages}>
        <div className={style.events}>
          <FontAwesomeIcon icon={faChartPie} style={{ marginRight: "12px" }} />
          Reports
        </div>

        <div className={style.eventsAndSearch}>
          <div className={style.btns}>
            <button onClick={() => handleButtonClick("order")}>
              Order (1)
            </button>
            <button onClick={() => handleButtonClick("customer")}>
              Customers (0)
            </button>
            <button onClick={() => handleButtonClick("ticket")}>
              Tickets (1)
            </button>
            <button onClick={() => handleButtonClick("payouts")}>
              Payouts (1)
            </button>
          </div>
          {/* <div className={style.searchAndBtns}>
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
                  placeholder="Phone number"
                  style={{ border: "none", marginLeft: "25px" }}
                />
              </InputGroup>
            </div>
            <button className={style.refBtn}>
              <FontAwesomeIcon icon={faRotateRight} /> Refresh
            </button>
          </div>
          <div className={style.filter}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    All Events
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={allEvents}
                    label="All Events"
                    onChange={handleChange}
                  >
                    <MenuItem value={"All Events"}>All Events</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    All Orders
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={allOrders}
                    label="All Orders"
                    onChange={handleChangeAllOrders}
                  >
                    <MenuItem value={"All Orders"}>All Orders</MenuItem>
                    <MenuItem value={"Refunded"}>Refunded</MenuItem>
                    <MenuItem value={"Refunded Rejected"}>
                      Refunded Rejected
                    </MenuItem>
                    <MenuItem value={"Refunded Requnded"}>
                      Refunded Requnded
                    </MenuItem>
                    <MenuItem value={"Partially Refunded"}>
                      Partially Refunded
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>{" "}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    All Orders
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={activeOrders}
                    label="All Orders"
                    onChange={handleChangeActiveOrders}
                  >
                    <MenuItem value={"All Orders"}>All Orders</MenuItem>
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Canceled"}>Canceled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div> */}
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
    </>
  );
}

export { Reports };
