import React from "react";
import { Link } from "react-router-dom";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { formReducer } from "../../Global files/formReducer";
import axios from "axios";
import { ProductAPI } from "../../Global files/ProductsAPI";


// SignUp Component
export default function SignUpPage() {
  // navigate function
  const navigate = useNavigate();

  // form state management with help reducer
  const [form, setForm] = useReducer(formReducer, {
    fullname: "",
    contactnumber: "",
    email: "",
    password: "",
    cPassword: "",
  });

  // form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${ProductAPI}/auth/register`, form);  
      navigate('/login')
    } catch (error) {
      console.log(error.message);
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
      <div className="row justify-content-center m-2">
        <div className="col-sm-4 col-md-6 col-lg-4 p-3 rounded-5 shadow-lg p-4">
          <form
            className="d-flex flex-column gap-3 text-center"
            onSubmit={handleSubmit}
          >
            <h4 className="MainContent_Text">Real Food Right To You</h4>
            <div className="text-center">
              {" "}
              <img
                src="https://www.pngall.com/wp-content/uploads/5/Chinese-Noodles-PNG-File-Download-Free.png"
                className="w-50"
                alt=""
              />
            </div>
            {/* Full name */}
            <div>
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                id="fullname"
                required
                className="form-control"
                onChange={setForm}
              />
            </div>
            {/* Contact number */}
            <div>
              <input
                type="text"
                name="contactnumber"
                className="form-control"
                placeholder="Mobile Number"
                id="contactnumber"
                required
                onChange={setForm}
              />
            </div>
            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                id="email"
                required
                onChange={setForm}
              />
            </div>
            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                id="password"
                required
                onChange={setForm}
              />
            </div>
            {/* Confirm Password */}
            <div>
              <input
                type="password"
                name="cPassword"
                placeholder="Confirm Password"
                className="form-control"
                id="cPassword"
                required
                onChange={setForm}
              />
            </div>
            {/* submit Button */}
            <button
              type="submit"
              className="btn btn-outline-danger text-warning fw-bold"
            >
              Sign Up
            </button>
            <p>
              Already a User?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
