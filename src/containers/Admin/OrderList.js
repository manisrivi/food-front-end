import React from "react";
import AdminNavbar from "./AdminNavbar";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function OrderList() {
  // navigate to page
  const navigate = useNavigate();
  // user details state management
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] =  useState(true);
  const [query, setQuery] = useState("");

  // get users details
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/orders`);
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
          await axios.delete(`${ProductAPI}/orders/${_id}`, { _id });
          alert("Deleted Successfully");
          getUsers();
        } catch (error) {
          console.log(error.message);
        }
      }
    };
  

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <AdminNavbar />
      <div className="container">
      <div className="d-flex justify-content-between mb-2 mt-2">
      <input
          type="text"
          className="mx-auto rounded-2 w-25 px-4"
          placeholder="Search food"
          onChange={(event) => setQuery(event.target.value)}
        />
      <p className="text-center text-danger fw-bold mx-auto">-All Orders Information</p>
      </div>
        <div className="row table-responsive">
          <table className="text-center table">
            <thead className="bg-success bg-opacity-75 text-warning">
              <tr>
                <th>Order Id</th>
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
                src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                alt=""
              />
            </div>
          )}
            <tbody className="bg-light">
              {users.filter((g) => g.token.card.name.toLowerCase().includes(query)).map((u, index) => {
                return (
                  <tr key={index}>
                    <td>{u._id}</td>
                    <td>{u.token.card.name}</td>
                    <td>
                      {u.token.card.address_line1}, {u.token.card.address_city},{" "}
                      {u.token.card.address_zip}
                    </td>
                    <td>{u.token.email}</td>
                    <td>{u.date}</td>
                    <td>{u.total}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-outline-white border-0"
                        onClick={() => navigate("/orders/" + u._id)}
                      >
                        <span
                          class="iconify text-info"
                          data-icon="bi:info-circle-fill"
                        ></span>
                      </button>

                      <button
                        className="btn btn-outline-white border-0"
                        onClick={()=> deleteOrder(u)}
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

// user individual Information
export function OrdersInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [orders, setOrders] = useState({});
  const [isLoading, setIsLoading] =  useState(true);

  const getOrderInfo = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/orders/${id}`);
      setOrders(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOrderInfo();
  }, [id]);

  return (
    <div className="container">
      <AdminNavbar />
      {isLoading && (
                  <div className="progress mt-3">
                  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}}></div>
                  </div>
              )}
      <h6 className="text-center text-danger fw-bold mt-3">
        --User Orders details
      </h6>
      <div className="row table-responsive">
        <table className="text-center table">
          <thead className="bg-success bg-opacity-75 text-warning">
            <tr>
              <th>Food-Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          {/* <tbody>
            {orders.product.map((u, index) => {
              return (
                <tr>
                  <td>{u._id}</td>
                  <td>{u.name}</td>
                  <td>{u.price}</td>
                  <td>{u.quantity}</td>
                  <td>{u.price * u.quantity}</td>
                </tr>
              );
            })}
          </tbody> */}
        </table>
      </div>
    </div>
  );
}
