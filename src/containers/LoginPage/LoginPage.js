import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { formReducer } from "../../Global files/formReducer";
import { ProductAPI } from "../../Global files/ProductsAPI";
import axios from "axios";

// Login Component
export default function LoginPage() {
  // navigate function
  const navigate = useNavigate();

  // Form state management with help reducer
  const [form, setForm] = useReducer(formReducer, {
    email: "",
    password: "",
  });

  // form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {
        data: { authToken },
      } = await axios.post(`${ProductAPI}/auth/login`, form);
       window.localStorage.setItem('authToken', authToken);
       console.log(authToken);
      navigate("/products");
    } catch ({ response: { data } }) {
      console.log(data.error);
    }
  };

  return (
    <div className="container">
      <nav class="navbar bg-white">
        <div class="container">
          <span class="navbar-brand mb-0 h1">
            <Link class="text-decoration-none fw-bold text-danger" to="/">
              Noodle<span className="text-warning">Country</span>
            </Link>{" "}
          </span>
        </div>
      </nav>
      <div className="row justify-content-center mt-5 m-2">
        <div className="col-sm-4 col-md-6 col-lg-4 rounded-5 shadow-lg p-4 text-center">
          <h5 className="text-center">Let's get started</h5>
          <img
            src="https://b.zmtcdn.com/data/pictures/4/19440804/bc57b2b464486ac77c74b300d45d0e52.png"
            className="w-50 mb-2"
            alt=""
          />
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column gap-3">
              {/* email */}
              <div>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={setForm}
                />
              </div>
              {/* Password */}
              <div>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onClick={setForm}
                />
              </div>
              {/* submit button */}
              <div className="">
                <button
                  type="submit"
                  className="w-100 btn btn-outline-danger text-warning fw-bold"
                  // onClick={() => navigate("/products")}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-decoration-none">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
