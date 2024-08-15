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

import Highlighter from "react-highlight-words";
import axios from "axios";

function Events() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null);
  const searchInput = useRef(null);
  // const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  // console.log("Token:", token);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    if (!token) {
      setError(new Error("No token found, please log in again."));
      setLoading(false);
      return;
    }

    axios("http://localhost:5011/api/Event/events", {
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
      // width: "8%",
      // ...getColumnSearchProps("name"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // width: "25%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Event Date",
      dataIndex: "eventDate",
      key: "eventDate",
      // width: "15%",
      ...getColumnSearchProps("eventDate"),
    },
    {
      title: "Begin Time",
      dataIndex: "beginTime",
      key: "beginTime",
      // width: "15%",
      ...getColumnSearchProps("beginTime"),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      // width: "15%",
      ...getColumnSearchProps("endTime"),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      // width: "15%",
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
          type="primary" style={{ marginRight: 8, backgroundColor: 'yellow', borderColor: 'yellow',color:"black" }}
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
        <Button type="danger"
        style={{ backgroundColor: '#f5222d', borderColor: '#f5222d' ,color:"white"}} onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
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
                  type="tel"
                  placeholder="Phone number"
                  style={{ border: "none", marginLeft: "25px" }}
                />
              </InputGroup>
            </div>
            <div className={style.btns}>
              <button>All Events (1)</button>
              <button>Online Events (0)</button>
              <button>Venue Events</button>
            </div>
          </div>
        </div>

        <div className={style.dataTables}>
          {/* <CustomFilterDemo /> */}
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            style={{ clear: "none" }}
          />
        </div>
      </div>
    </>
  );
}

export { Events };
