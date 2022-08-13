// import files
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// contact page
export default function ContactPage() {
  // navigate function
  const navigate = useNavigate();

  // Validation Schema
  const ContactSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    subject: Yup.string().required(),
    message: Yup.string().required(),
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
      <div className="row text-center mt-3">
        {/* Quotes */}
        <div className="col">
          <h6 className="text-danger fw-bold text-opacity-75">
            - Enjoy Life It's Delicious{" "}
          </h6>
        </div>
      </div>
      <div className="row mt-4 m-2">
        {/* Address */}
        <div className="col-sm-6 text-center">
          <h2 className="MainContent_Text ">Corporate office</h2>
          <p className="text-secondary">
            <span> Noodlecountry Restaurant </span>
            <br />
            No. 25/30, Fourth floor, <br /> Ramky House, <br /> Hennur Outer
            Ring Rd, <br /> Kalyan Nagar, Bengaluru, <br /> Karnataka - 600 016.{" "}
          </p>
        </div>
        {/* Contact Page */}
        <div className="col-sm-4 col-md-6 col-lg-4 rounded-5 shadow-lg p-4 border">
          <Formik
            initialValues={{
              name: "",
              email: "",
              subject: "",
              message: "",
            }}
            validationSchema={ContactSchema}
            onSubmit={async (values) => {
              try {
                navigate("/");
                toast.success("Send Successfull");
                // send mail to user api call
                await axios.post(`${ProductAPI}/auth/sendmail`, values);
              } catch (error) {}
            }}
          >
            {({ errors, touched }) => (
              <Form className="mb-3">
                <div className="d-flex flex-column gap-3 text-center">
                  {/* heading */}
                  <h5 className="MainContent_Text">Reach Us</h5>
                  {/* your name */}
                  <div>
                    <Field
                      className="form-control"
                      name="name"
                      placeholder="Name"
                    />
                  </div>
                  {errors.name && touched.name ? (
                    <span className="text-danger text-start">
                      *{errors.name}*
                    </span>
                  ) : null}
                  {/* your email */}
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
                  {/* your subject */}
                  <div>
                    <Field
                      className="form-control"
                      name="subject"
                      type="text"
                      placeholder="Subject"
                    />
                  </div>
                  {errors.subject && touched.subject ? (
                    <span className="text-danger text-start">
                      *{errors.subject}*
                    </span>
                  ) : null}
                  {/* your message */}
                  <div>
                    <Field
                      component="textarea"
                      className="form-control"
                      name="message"
                      placeholder="Message"
                    />
                  </div>
                  {errors.message && touched.message ? (
                    <span className="text-danger text-start">
                      *{errors.message}*
                    </span>
                  ) : null}
                  {/* button */}
                  <div>
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
