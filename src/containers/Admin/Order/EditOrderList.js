import React from "react";
import AdminNavbar from "../AdminCommonFiles/AdminNavbar";
import { ProductAPI } from "../../../Global files/ProductsAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Edit FoodList

export function EditOrderList() {
    // authToken
    const adminauthToken = window.localStorage.getItem("adminauthToken");

  // state management
  const { id } = useParams();
  const [orders, setOrders] = useState(null);

  // edit orders & api call
  const editOrders = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/orders/${id}`,{
        headers: {
          Authorization: `Bearer ${adminauthToken}`,
        },
      });
      setOrders(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    editOrders();
  }, []);

  return (
    <div className="container">
      {orders ? (
        <EditOrderForm orders={orders} />
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
// Edit order form function

export function EditOrderForm({ orders }) {
    // authToken
    const adminauthToken = window.localStorage.getItem("adminauthToken");

  // navigate to page
  const navigate = useNavigate();

  // state management
  const [userId, setUserId] = useState(orders.userId);
  const [token, setToken] = useState(orders.token);
  const [product, setProduct] = useState(orders.product);
  const [total, setTotal] = useState(orders.total);
  const [status, setStatus] = useState(orders.status);

  // edit order details & api call
  const editfood = async () => {
    const updateFood = {
      userId: userId,
      token: token,
      product: product,
      total: total,
      status: status,
    };

    try {
      await axios.put(`${ProductAPI}/orders/${orders._id}`, updateFood,{
        headers: {
          Authorization: `Bearer ${adminauthToken}`,
        },
      });
      navigate("/orderList");
    } catch (error) {
      console.log(error.message);
    }

  };

  return (
    <div className="container">
      <AdminNavbar />
      <div className="row justify-content-center m-2 mt-5 mx-auto gap-3">
        <div className="col-sm-4 col-md-6 col-lg-4 p-3 rounded-5 shadow-lg p-4 mx-auto">
          <h5 className="text-center MainContent_Text">Delivery Status</h5>
          {/* user Id */}
          <input
            className="mt-2 form-control"
            value={userId}
            type="text"
            placeholder="userId"
            onChange={(event) => setUserId(event.target.value)} />
          {/* token */}
          <input
            className="mt-2 form-control"
            value={token}
            type="text"
            placeholder="token"
            onChange={(event) => setToken(event.target.value)} />
          {/* product */}
          <input
            className="mt-2 form-control"
            value={product}
            type="text"
            placeholder="Product"
            onChange={(event) => setProduct(event.target.value)} />
          {/* total */}
          <input
            className="mt-2 form-control"
            value={total}
            type="number"
            placeholder="Total"
            onChange={(event) => setTotal(event.target.value)} />
          {/* status */}
          <select
            className="mt-2 form-control"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option>order placed</option>
            <option>Food Prepared</option>
            <option>Ready to delivery</option>
            <option>Delivered</option>
          </select>
          {/* submit */}
          <button
            className="btn btn-outline-success fw-bold mt-2 form-control"
            onClick={editfood}
          >
            UPDATE
          </button>
        </div>
        <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
          <img
            src="https://theninehertz.com/wp-content/uploads/2020/04/food-delivery.gif"
            className="w-100"
            alt="" />
        </div>
      </div>
    </div>
  );
}
