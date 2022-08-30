// import files
import React from "react";
import AdminNavbar from "../AdminCommonFiles/AdminNavbar";
import { ProductAPI } from "../../../Global files/ProductsAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

// order List function
export default function OrderList() {
  // authToken
  const adminauthToken = window.localStorage.getItem("adminauthToken");
  // navigate to page
  const navigate = useNavigate();
  // user details state management
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  // get users details and api call
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/orders`,{
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


  // delete user
  const deleteOrder = async ({ _id }) => {
    if (window.confirm(`Are You Sure Delete This order`)) {
      try {
        await axios.delete(`${ProductAPI}/orders/${_id}`,{
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

  // useEffect use refresh data
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <AdminNavbar />
      <div className="container">
        <div className="d-flex justify-content-between mb-2 mt-2">
          {/* Search name */}
          <input
            type="text"
            className="mx-auto rounded-2 w-25 px-4"
            placeholder="Search Name"
            onChange={(event) => setQuery(event.target.value)}
          />
          <p className="text-center text-danger fw-bold mx-auto">
            -All Orders Information
          </p>
        </div>
        {/* orders list */}
        <div className="row table-responsive">
          <table className="text-center table">
            <thead className="bg-success bg-opacity-75 text-warning">
              <tr>
                <th>Order Id</th>
                <th>Status</th>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Date / Time</th>
                <th>Amount</th>
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
              {users
                 .filter((g) => g.token.card.name.toLowerCase().includes(query))
                .map((u, index) => {
                  return (
                    <tr key={index}>
                      <td>{u._id}</td>
                      <td className="text-primary fw-bold">{u.status}</td>
                      <td>{u.token.card.name}</td>
                      <td>
                        {u.token.card.address_line1},{" "}
                        {u.token.card.address_city}, {u.token.card.address_zip}
                      </td>
                      <td>{u.token.email}</td>
                      <td>
                        {u.date}-{u.time}
                      </td>
                      <td>{u.total}</td>
                      <td className="justify-content-center">
                        {/* order edit */}
                        <button
                          className="btn btn-outline-white border-0"
                          onClick={() =>
                            navigate("/editOrderList/edit/" + u._id)
                          }
                        >
                          <span
                            class="iconify text-warning"
                            data-icon="entypo:edit"
                          ></span>
                        </button>
                        {/* order info */}
                        <button
                          className="btn btn-outline-white border-0"
                          onClick={() => navigate("/orders/" + u._id)}
                        >
                          <span
                            class="iconify text-info"
                            data-icon="bi:info-circle-fill"
                          ></span>
                        </button>
                        {/* order delete */}
                        <button
                          className="btn btn-outline-white border-0"
                          onClick={() => deleteOrder(u)}
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


