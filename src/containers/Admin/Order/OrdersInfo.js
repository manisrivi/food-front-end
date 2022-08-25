import React from "react";
import AdminNavbar from "../AdminCommonFiles/AdminNavbar";
import { ProductAPI } from "../../../Global files/ProductsAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// user individual orders Information

export function OrdersInfo() {
    // authToken
    const adminauthToken = window.localStorage.getItem("adminauthToken");

  // navigate to page
  const navigate = useNavigate();

  // state management
  const { id } = useParams();
  const [orders, setOrders] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // get order details and api call
  const getOrderInfo = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/orders/${id}`,{
        headers: {
          Authorization: `Bearer ${adminauthToken}`,
        },
      });
      setOrders(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    getOrderInfo();
  }, [id]);

  return (
    <div className="container">
      <AdminNavbar />
      {isLoading && (
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
      <h6 className="text-center text-danger fw-bold mt-3">
        --User Orders details
      </h6>
      {/* order info table */}
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
          <tbody>
            {orders.product &&
              orders.product.map((p, index) => {
                return (
                  <tr>
                    <td>{p._id}</td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>{p.price * p.quantity}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
