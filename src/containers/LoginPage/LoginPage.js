import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductAPI } from "../../Global files/ProductsAPI";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Login Component
export default function LoginPage() {
  // navigate function
  const navigate = useNavigate();

  // Login Schema
  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required("Please enter your password"),
  });

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
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              try {
                const {
                  data: { authToken },
                } = await axios.post(`${ProductAPI}/auth/login`, values);
                window.localStorage.setItem("authToken", authToken);
                navigate("/products");
              } catch ({ response: { data } }) {
                console.log(data.error);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="d-flex flex-column gap-2">
                  {/* email */}
                  <div>
                    <Field
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <span className="text-danger text-start">
                      *{errors.email}*
                    </span>
                  ) : null}
                  {/* Password */}
                  <div>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  {errors.password && touched.password ? (
                    <span className="text-danger text-start">
                      *{errors.password}*
                    </span>
                  ) : null}
                  {/* submit button */}
                  <div className="">
                    <button
                      type="submit"
                      className="w-100 btn btn-outline-danger text-warning fw-bold"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
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
