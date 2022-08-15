// import files
import React from "react";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { useEffect } from "react";
import { useReducer } from "react";
import { formReducer } from "../../Global files/formReducer";
import { useParams } from "react-router-dom";

export default function TableBook() {
  const [query, setQuery] = useState("");
  // navigate to page
  const navigate = useNavigate();
  // user details state management
  const [tableList, setTableList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // get food details
  const getTableList = async () => {
    try {
      // api call & state management
      const { data } = await axios.get(`${ProductAPI}/table`);
      setTableList(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete food
  const deleteTable = async ({ fullname, _id }) => {
    // api call & state management
    if (window.confirm(`Are You Sure Delete This User ${fullname}`)) {
      try {
        await axios.delete(`${ProductAPI}/table/${_id}`, { _id });
        alert("Deleted Successfully");
        getTableList();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    getTableList();
  }, []);

  return (
    <div className="container">
    <AdminNavbar />
    <div className="d-flex justify-content-between mb-3 gap-0 mt-2 mx-auto mt-2">
      <input
        type="text"
        className="px-2 rounded-2 w-25"
        placeholder="Search food"
        onChange={(event) => setQuery(event.target.value)}
      />
      <h6 className="text-center fw-bold text-danger">
        --All Booking Informations
      </h6>
    </div>
    <div className="row table-responsive">
      {/* food list Table */}
      <table className="text-center table">
        <thead className="bg-success bg-opacity-75 text-warning">
          <tr>
            <th>Booking Id</th>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Location</th>
            <th>Date / Time</th>
            <th>Food Type</th>
            <th>Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        {isLoading && (
          <div className="">
            <img
              src="https://i.stack.imgur.com/hzk6C.gif"
              alt=""
            />
          </div>
        )}
        <tbody className="bg-light">
          {tableList
            .filter((g) => g.fullname.toLowerCase().includes(query))
            .map((u, index) => {
              return (
                <tr key={index}>
                  <td className="text-start">{u._id}</td>
                  <td className="text-start">{u.fullname}</td>
                  <td>{u.contactnumber}</td>
                  <td>{u.email}</td>
                  <td>{u.location}</td>
                  <td>{u.date} - {u.time}</td>
                  <td>{u.foodtype}</td>
                  <td>{u.count}</td>
                  <td className="">
                    <button
                      className="btn btn-outline-white border-0"
                      onClick={() => navigate("/editTableList/edit/" + u._id)}
                    >
                      <span
                        class="iconify text-warning"
                        data-icon="entypo:edit"
                      ></span>
                    </button>
                    <button
                      className="btn btn-outline-white border-0"
                      onClick={() => deleteTable(u)}
                    >
                      <span
                        class="iconify text-danger"
                        data-icon="ant-design:delete-filled"
                      ></span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  </div>
  )
}


// Edit FoodList function
export function EditTableList() {
  // state management
  const { id } = useParams();
  const [table, setTable] = useState(null);

  // edit food api call
  const editTable = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/table/${id}`);
      setTable(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    editTable();
  });

  return (
    <div className="container">
      {table ? (
        <EditFoodForm table={table} />
      ) : (
        <div className="progress mt-3">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "75%" }}
          ></div>
        </div>
      )}
    </div>
  );
}

// Edit Food list form function
export function EditFoodForm({ table }) {
  // navigate to page
  const navigate = useNavigate();
 
  // state management
  const [fullname, setFullName] = useState(table.fullname);
  const [contactnumber, setContactnumber] = useState(table.contactnumber);
  const [email, setEmail] = useState(table.email);
  const [location, setLocation] = useState(table.location);
  const [date, setDate] = useState(table.date);
  const [time, setTime] = useState(table.time);
  const [foodtype, setFoodType] = useState(table.foodtype);
  const [count, setCount] = useState(table.count);

  // edit food update form and api call
  const editTable = async () => {
    const updateTable = {
      fullname: fullname,
      contactnumber: contactnumber,
      email: email,
      location: location,
      date: date,
      time: time,
      foodtype: foodtype,
      count: count,
    };
    fetch(`${ProductAPI}/table/${table._id}`, {
      method: "PUT",
      body: JSON.stringify(updateTable),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => navigate("/tablebook"));


    const updateTableMail = {
      email: updateTable.email,
      message: `
      <h1 style="text-align: center;">Welcome To <span style="color:red;">Noodle</span><span style="color:#FFD700;">Country</span> Restaurant</h1>
      <h3 style="color:#008000; text-align: center;">Cancel Booking</h3><br/>
     <p> fullname: ${updateTable.fullname}</p>
     <p> contactnumber: ${updateTable.contactnumber}</p>
     <p> email: ${updateTable.email}</p>
     <p> location: ${updateTable.location}</p>
     <p> date: ${updateTable.date}</p>
     <p> time: ${updateTable.time}</p>
     <p> foodtype: ${updateTable.foodtype}</p>
     <p> count: ${updateTable.count}</p>
     Best Wishes!!! <br/>
     <h3><span style="color:red;">Noodle</span><span style="color:#FFD700;">Country</span></h3> -- Restaurant --
      `,
      subject: "Booking Cancel",
      name: `"Hi", ${updateTable.fullname}`,
    }
      // send mail to user api call
      await axios.post(`${ProductAPI}/auth/sendmail`, updateTableMail);
      console.log(updateTableMail);
  };

  return (
    <div className="container">
      <AdminNavbar />
      <div className="row justify-content-center m-2 mt-5 mx-auto gap-3">
        <div className="col-sm-4 col-md-6 col-lg-4 p-3 rounded-5 shadow-lg p-4 mx-auto">
          <h5 className="text-center MainContent_Text">Edit Table List</h5>
          {/* name */}
          <input
            className="mt-2 form-control"
            value={fullname}
            type="text"
            placeholder="name"
            onChange={(event) => setFullName(event.target.value)}
          />
          {/* Contact number */}
          <input
            className="mt-2 form-control"
            value={contactnumber}
            type="text"
            placeholder="contact number"
            onChange={(event) => setContactnumber(event.target.value)}
          />
          {/* email */}
          <input
            className="mt-2 form-control"
            value={email}
            type="email"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          {/* location*/}
          <input
            className="mt-2 form-control"
            value={location}
            type="text"
            placeholder="location"
            onChange={(event) => setLocation(event.target.value)}
          />
          {/* date */}
          <input
            className="mt-2 form-control"
            value={date}
            type="date"
            placeholder="date"
            onChange={(event) => setDate(event.target.value)}
          />
          {/* time */}
          <input
            className="mt-2 form-control"
            value={time}
            type="text"
            placeholder="time"
            onChange={(event) => setTime(event.target.value)}
          />
            {/* foodtype */}
            <input
            className="mt-2 form-control"
            value={foodtype}
            type="text"
            placeholder="foodtype"
            onChange={(event) => setFoodType(event.target.value)}
          />
            {/* count */}
            <input
            className="mt-2 form-control"
            value={count}
            type="text"
            placeholder="count"
            onChange={(event) => setCount(event.target.value)}
          />
          {/* submit button */}
          <button
            className="btn btn-outline-success fw-bold mt-2 form-control"
            onClick={editTable}
          >
            CANCEL ORDER
          </button>
        </div>
        <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
          <img
            src="https://www.excelsisdeo.com/images/AlphaTestersAnimation_60.gif"
            className="w-100"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
