// import files
import React from "react";
import AdminNavbar from "../AdminCommonFiles/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ProductAPI } from "../../../Global files/ProductsAPI";
import { useEffect } from "react";
import { useReducer } from "react";
import { formReducer } from "../../../Global files/formReducer";

export default function TableBookList() {
  // authToken
  const adminauthToken = window.localStorage.getItem("adminauthToken");

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
      const { data } = await axios.get(`${ProductAPI}/table`, {
        headers: {
          Authorization: `Bearer ${adminauthToken}`,
        },
      });
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
        await axios.delete(`${ProductAPI}/table/${_id}`, { _id }, {
          headers: {
            Authorization: `Bearer ${adminauthToken}`,
          },
        });
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
              <img src="https://i.stack.imgur.com/hzk6C.gif" alt="" />
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
                    <td>
                      {u.date} - {u.time}
                    </td>
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
  );
}
