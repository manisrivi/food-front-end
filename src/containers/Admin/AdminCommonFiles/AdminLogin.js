// import files
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { ProductAPI } from "../../../Global files/ProductsAPI";
import axios from "axios";

// Admin Login Page
export default function Admin() {
  // navigate to page
  const navigate = useNavigate();

  // Login Schema
  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required("Please enter your password"),
  });

  return (
    <div className="container">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <span class="navbar-brand mb-0 h1">
            <Link class="text-decoration-none fw-bold text-danger" to="/">
              Noodle<span className="text-warning">Country</span>
            </Link>{" "}
          </span>
        </div>
      </nav>
      <div className="row justify-content-center mt-5 m-2">
        <div className="col-sm-4 col-md-6 col-lg-4 rounded-5 shadow-lg p-4 text-center border">
          <h5 className="text-center">Admin</h5>
          <span
            class="iconify text-primary"
            data-icon="clarity:administrator-solid"
            data-width="70"
          ></span>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              try {
                // api call
                const {
                  data: { adminauthToken },
                } = await axios.post(`${ProductAPI}/admin-auth/login`, values);
                // set admin authToken for local storage
                window.localStorage.setItem("adminauthToken", adminauthToken);
                // navigate to admin home page
                navigate("/adminHome");
                // success message
                toast.success("Login Successfully");
              } catch ({ response: { data } }) {
                // errorMessage
                toast.error(data.error);
              }
            }}
          >
            {/* Formik Form validation */}
            {({ errors, touched }) => (
              <Form className="mb-3 mt-2">
                <div className="d-flex flex-column gap-3">
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
                  {/* button */}
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
        </div>
      </div>
    </div>
  );
}
