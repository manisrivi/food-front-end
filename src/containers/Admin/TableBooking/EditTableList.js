import React from "react";
import AdminNavbar from "../AdminCommonFiles/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ProductAPI } from "../../../Global files/ProductsAPI";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

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
    };
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
            onChange={(event) => setFullName(event.target.value)} />
          {/* Contact number */}
          <input
            className="mt-2 form-control"
            value={contactnumber}
            type="text"
            placeholder="contact number"
            onChange={(event) => setContactnumber(event.target.value)} />
          {/* email */}
          <input
            className="mt-2 form-control"
            value={email}
            type="email"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)} />
          {/* location*/}
          <input
            className="mt-2 form-control"
            value={location}
            type="text"
            placeholder="location"
            onChange={(event) => setLocation(event.target.value)} />
          {/* date */}
          <input
            className="mt-2 form-control"
            value={date}
            type="date"
            placeholder="date"
            onChange={(event) => setDate(event.target.value)} />
          {/* time */}
          <input
            className="mt-2 form-control"
            value={time}
            type="text"
            placeholder="time"
            onChange={(event) => setTime(event.target.value)} />
          {/* foodtype */}
          <input
            className="mt-2 form-control"
            value={foodtype}
            type="text"
            placeholder="foodtype"
            onChange={(event) => setFoodType(event.target.value)} />
          {/* count */}
          <input
            className="mt-2 form-control"
            value={count}
            type="text"
            placeholder="count"
            onChange={(event) => setCount(event.target.value)} />
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
            alt="" />
        </div>
      </div>
    </div>
  );
}
