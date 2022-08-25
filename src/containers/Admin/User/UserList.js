// import files
import React from "react";
import AdminNavbar from "../AdminCommonFiles/AdminNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductAPI } from "../../../Global files/ProductsAPI";
import { useNavigate } from "react-router-dom";

// All user List
export default function UserList() {
  // authToken
  const adminauthToken = window.localStorage.getItem("adminauthToken");

  // navigate to page
  const navigate = useNavigate();
  // user details state management
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // get users details and api call
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/users`,{
        headers: {
          Authorization: `Bearer ${adminauthToken}`,
        },
      });
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    getUsers();
  }, []);

  // delete user & api call
  const deleteUser = async ({ fullname, _id }) => {
    if (window.confirm(`Are You Sure Delete This User ${fullname}`)) {
      try {
        await axios.delete(`${ProductAPI}/users/${_id}`, {
          headers: {
            Authorization: `Bearer ${adminauthToken}`,
          },
        });
        alert("Deleted Successfully");
        getUsers();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <div className="d-flex justify-content-between mb-2">
          <input
            type="text"
            className="mx-auto rounded-2 w-25 px-4"
            placeholder="Search Name"
            onChange={(event) => setQuery(event.target.value)}
          />
          <p className="text-center text-danger fw-bold mx-auto">
            -All Users Information
          </p>
        </div>
        {/* user list table */}
        <div className="row table-responsive">
          <table className="text-center table">
            <thead className="bg-success bg-opacity-75 text-warning">
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Register Date / Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <div className="text-center">
              {" "}
              {isLoading && (
                <div className="">
                  <img src="https://i.stack.imgur.com/hzk6C.gif" alt="" />
                </div>
              )}
            </div>
            <tbody className="bg-light">
              {users
                .filter((g) => g.fullname.toLowerCase().includes(query))
                .map((u, index) => {
                  return (
                    <tr key={index}>
                      <td>{u._id}</td>
                      <td>{u.fullname}</td>
                      <td>{u.contactnumber}</td>
                      <td>{u.email}</td>
                      <td>
                        {u.date} - {u.time}
                      </td>
                      <td className="d-flex gap-2">
                        {/* <button
                          className="btn btn-outline-white border-0"
                          onClick={() => navigate("/users/" + u._id)}
                        >
                          <span
                            class="iconify text-info"
                            data-icon="bi:info-circle-fill"
                          ></span>
                        </button> */}

                        <button
                          className="btn btn-outline-white border-0"
                          onClick={() => deleteUser(u)}
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
    </div>
  );
}
