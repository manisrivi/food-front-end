// import files
import React, { useState } from "react";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import UserNavbar from "../userNavbar/userNavbar";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../redux/cartRedux";
import axios from "axios";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

// stripe key
const KEY = process.env.REACT_APP_STRIPE;

// cart function
export default function Cart() {
  // authtoken localStorage
  const authToken = window.localStorage.getItem("authToken");
  const email = window.localStorage.getItem("email");

  // navigate to page
  const navigate = useNavigate();

  // state management
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // declere the variables
  const product = cart.products;
  const quantity = cart.quantity;
  const total = cart.total;

  // initial order status
  const status = "order placed";

  // remove from cart
  const handleRemove = (index) => {
    dispatch(
      removeProduct({ index, price: product[index].price, quantity, total })
    );
  };

  // payment function & api call
  async function handleToken(token, addresses) {
    // send to payment
    const response = await axios.post(`${ProductAPI}/checkout`, {
      token,
      product,
    },{
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // send to orders from db
    await axios.post(
      `${ProductAPI}/orders`,
      { token, product, total, status },{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

    // send mail to user template
    const form = {
      email: email,
      message: ` 
      <h1 style="text-align: center;">Welcome To <span style="color:red;">Noodle</span><span style="color:#FFD700;">Country</span> Restaurant</h1>
      <h3 style="color:#008000; text-align: center;">Your Orders</h3> <br/>
      <table role="presentation" border="1" cellspacing="1" width="50%" style="margin-left: auto; margin-right: auto;">
      <thead>
        <tr>
          <th>Food name</th>
          <th>Total amount</th>
        </tr>
      </thead>
      <tbody role="presentation" border="1" cellspacing="1" width="50%" align="center">
          <td>${product.map((x) => x.name)}</td>
          <td>${total}</td>
      </tbody>
    </table>
    <br/>
    Best Wishes!!! <br/>
    <h3><span style="color:red;">Noodle</span><span style="color:yellow;">Country</span></h3> -- Restaurant --
    `,
      subject: "Orders",
      name: `"Hi", ${email}`,
    };

    // navigate to success page
    navigate("/success");

    // send Mail api call
    await axios.post(`${ProductAPI}/auth/sendmail`, form);
    if (response === 200) {
      navigate("/success");
      console.log("200");
    } else {
      console.log("error");
    }
  }

  return (
    <div className="container">
      <UserNavbar />
      {total === 0 ? (
        <div className="text-center">
          <h1 className="fw-bold text-success">Cart Empty</h1>
          <h6>Go to order Noodles</h6>
          <img className="w-50" src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="" />
        </div>) : (
      <div className="row">
        {/* cart list */}
        <div className="col-lg-8">
          <div className="row">
            {product.map((product, index) => (
              <CartTemplate
                {...product}
                key={index}
                delbtn={
                  <button
                    onClick={() => handleRemove(index)}
                    className="btn btn-outline-white border-0 text-danger"
                  >
                    <span
                      class="iconify"
                      data-icon="ant-design:delete-filled"
                    ></span>
                  </button>
                }
              />
            ))}
          </div>
        </div>
        {/* cart total */}
        <div className="col h-100 shadow-lg mt-2 rounded-3 text-center MainContent_Text m-2">
          <div className="p-3">
            <h4 className="fw-bold">Order summary</h4>
            <h6>
              Total Price:{" "}
              <span className="fw-bold text-success">
                ₹ {Math.round(total)}
              </span>
            </h6>
            <StripeCheckout
              name="NoodleCountry"
              billingAddress
              shippingAddress
              description={`Your amount is ₹ ${Math.round(total)}`}
              amount={Math.round(total) * 100}
              token={handleToken}
              currency="INR"
              stripeKey={KEY}
            >
              <button className="btn btn-outline-danger text-warning fw-bold">
                Checkout Now
              </button>
            </StripeCheckout>
          </div>
        </div>
      </div>)}
    </div>
  );
}

// cart template
function CartTemplate({ img, _id, name, quantity, price, delbtn }) {
  return (
    <div className="col-sm-5 col-md-6 MainContent_Text">
      <div class="card border-0 shadow-lg rounded-3 mx-auto text-center m-2">
        <div className="text-center">
          <img src={img.url} class="card-img-top w-50" alt="..." />
        </div>
        <div class="card-body">
          <h6 className="fw-bold text-secondary"> Name: {name}</h6>
          <h6 className="fw-bold text-secondary">Id: {_id}</h6>
          <h6 className="fw-bold text-secondary">Qty: {quantity}Nos</h6>
          <h6 className="fw-bold text-secondary">
            Price: <span className="text-success">₹ {price * quantity}</span>
          </h6>
          <span className="delbtn">{delbtn}</span>
        </div>
      </div>
    </div>
  );
}
