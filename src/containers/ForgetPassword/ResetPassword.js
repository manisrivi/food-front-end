import React from "react";
import { ProductAPI } from "../../Global files/ProductsAPI";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  // reset Schema
  const resetSchema = Yup.object().shape({
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
        <h5 className="text-center">Reset your password?</h5>
        <img
          src="https://i.gifer.com/IPNp.gif"
          className="w-75 mb-2"
          alt=""
        />
        <Formik
          initialValues={{
            password: "",
          }}
          validationSchema={resetSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="d-flex flex-column gap-2">
                {/* email */}
                <div>
                  <Field
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
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
                    Submit
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
