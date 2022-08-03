import React from "react";
import { ProductAPI } from "../../Global files/ProductsAPI";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export default function ForgetPassword() {

  // email Schema
  const emailSchema = Yup.object().shape({
    email: Yup.string().email().required(),
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
        <h5 className="text-center">Forget your password?</h5>
        <h5>Don't Worry</h5>
        <img
          src="https://img.freepik.com/premium-vector/forgot-password-illustration_65141-418.jpg"
          className="w-75 mb-2"
          alt=""
        />
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={emailSchema}
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
                {/* submit button */}
                <div className="">
                  <button
                    type="submit"
                    className="w-100 btn btn-outline-danger text-warning fw-bold"
                  >
                    Send
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
