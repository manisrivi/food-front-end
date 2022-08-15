// import files
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import UserNavbar from "../userNavbar/userNavbar";

export default function BookTable() {
  // navigate function
  const navigate = useNavigate();

  // Validation Schema
  const TableSchema = Yup.object().shape({
    fullname: Yup.string().required(),
    contactnumber: Yup.number().required().positive().integer(),
    email: Yup.string().email().required(),
    location: Yup.string().required(),
    date: Yup.string().required(),
    time: Yup.string().required(),
    foodtype: Yup.string().required(),
    count: Yup.string().required(),
  });

  return (
    <div>
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
      </div>
      <div className="container">
        <div className="row justify-content-center">
          {/* Image */}
          <div className="mt-5 col-sm-6 col-lg-6 mx-auto ">
            <h6 className="fw-bold MainContent_Text">
              Take a <span className="text-danger">Noodle</span>
              <span className="text-warning">Country</span>
              <br /> <h1 className="text-success">Buffet break</h1>
            </h6>
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Food-Buffet-PNG-Clipart.png"
              className="w-100"
              alt=""
            />
            <h4 className="MainContent_Text">Let us serve you better</h4>
            <p className="MainContent_Text text-secondary">
              Don't wait in a line to enjoy your meal. Reserve a table in
              advance with us.
            </p>
          </div>
          {/* table booking form */}
          <div className="col-sm-6 col-lg-4 p-3 mx-auto">
            <div className="rounded-5 shadow-lg p-4 border">
              {/* Formik validation */}
              <Formik
                initialValues={{
                  fullname: "",
                  contactnumber: "",
                  email: "",
                  location: "",
                  date: "",
                  time: "",
                  foodtype: "",
                  count: "",
                }}
                validationSchema={TableSchema}
                onSubmit={async (values) => {
                  const form = {
                    email: values.email,
                    message: `
                    <h1 style="text-align: center;">Welcome To <span style="color:red;">Noodle</span><span style="color:#FFD700;">Country</span> Restaurant</h1>
                    <h3 style="color:#008000; text-align: center;">Booking Confirm</h3><br/>
                   <p style="text-align: center;">Fullname: <span style="color:#2a37eb">${values.fullname}</span></p>
                   <p style="text-align: center;">Contact Number: <span style="color:#2a37eb">${values.contactnumber}</span></p>
                   <p style="text-align: center;">Location: <span style="color:#2a37eb">${values.location}</span></p>
                   <p style="text-align: center;">Date: <span style="color:#2a37eb">${values.date}</span></p>
                   <p style="text-align: center;">Time: <span style="color:#2a37eb">${values.time}</span></p>
                   <p style="text-align: center;">Foodtype: <span style="color:#2a37eb">${values.foodtype}</span></p>
                   <p style="text-align: center;">Count: <span style="color:#2a37eb">${values.count}</span></p>
                Best Wishes!!! <br/>
                <h3><span style="color:red;">Noodle</span><span style="color:#FFD700;">Country</span></h3> -- Restaurant --
                `,
                    subject: "Booking Confirm",
                    name: `"Hi", ${values.fullname}`,
                  };
                  try {
                    // Register api call
                    await axios.post(`${ProductAPI}/table`, values);
                    navigate("/");
                    toast.success("Booking Successfull");
                    // send mail to user api call
                    await axios.post(`${ProductAPI}/auth/sendmail`, form);
                  } catch ({ response: { data } }) {
                    toast.error(data.error);
                  }
                }}
              >
                {({ errors, touched }) => (
                  <Form className="d-flex flex-column gap-2 text-center">
                    <h4 className="MainContent_Text">Eat Food Feel Good</h4>
                    {/* Full name */}
                    <div>
                      <Field
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        className="form-control"
                      />
                    </div>
                    {errors.fullname && touched.fullname ? (
                      <span className="text-danger text-start">
                        *{errors.fullname}*
                      </span>
                    ) : null}

                    {/* Contact number */}
                    <div>
                      <Field
                        type="number"
                        name="contactnumber"
                        className="form-control"
                        placeholder="Mobile Number"
                      />
                    </div>
                    {errors.contactnumber && touched.contactnumber ? (
                      <span className="text-danger text-start">
                        *{errors.contactnumber}*
                      </span>
                    ) : null}

                    {/* Email */}
                    <div>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                      />
                    </div>
                    {errors.email && touched.email ? (
                      <span className="text-danger text-start">
                        *{errors.email}*
                      </span>
                    ) : null}

                    {/* location */}
                    <div>
                      <Field
                        as="select"
                        name="location"
                        className="form-control"
                      >
                        <option className="text-center">
                          -- Select Location --
                        </option>
                        <option value="Chennai - Porur">Chennai - Porur</option>
                        <option value="Chennai - Vadapalani">
                          Chennai - Vadapalani
                        </option>
                        <option value="Chennai - T.nager">
                          Chennai - T.nager
                        </option>
                        <option value="Bangalore - Kalyan nagar">
                          Bangalore - Kalyan nagar
                        </option>
                        <option value="Bangalore - Gopalan Mall">
                          Bangalore - Gopalan Mall
                        </option>
                        <option value="Bangalore - Indira nagar">
                          Bangalore - Indira nagar
                        </option>
                      </Field>
                    </div>
                    {errors.location && touched.location ? (
                      <span className="text-danger text-start">
                        *{errors.location}*
                      </span>
                    ) : null}

                    {/* date */}
                    <div className="d-flex justify-content-between">
                      <div>
                        <Field
                          type="date"
                          name="date"
                          placeholder="date"
                          className="form-control"
                        />
                      </div>

                      {/* time */}
                      <div>
                        <Field
                          as="select"
                          name="time"
                          placeholder="time"
                          className="form-control"
                        >
                          <option className="">- Select Time -</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="01:00 PM">01:00 PM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="07:00 PM">07:00 PM</option>
                          <option value="08:00 PM">08:00 PM</option>
                          <option value="09:00 PM">09:00 PM</option>
                        </Field>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      {errors.date && touched.date ? (
                        <span className="text-danger text-start">
                          *{errors.date}*
                        </span>
                      ) : null}
                      {errors.time && touched.time ? (
                        <span className="text-danger text-end">
                          *{errors.time}*
                        </span>
                      ) : null}
                    </div>
                    <div className="d-flex justify-content-between">
                      {/* food type */}
                      <div>
                        <Field
                          as="select"
                          name="foodtype"
                          placeholder="foodtype"
                          className="form-control"
                        >
                          <option className="">--- Select Food ----</option>
                          <option value="Veg">Veg</option>
                          <option value="Non Veg">Non Veg</option>
                        </Field>
                      </div>

                      {/* count */}
                      <div>
                        <Field
                          as="select"
                          name="count"
                          placeholder="count"
                          className="form-control"
                        >
                          <option className="">-- Members --</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </Field>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      {errors.foodtype && touched.foodtype ? (
                        <span className="text-danger text-start">
                          *{errors.foodtype}*
                        </span>
                      ) : null}
                      {errors.count && touched.count ? (
                        <span className="text-danger text-end">
                          *{errors.count}*
                        </span>
                      ) : null}
                    </div>

                    {/* submit Button */}
                    <button
                      type="submit"
                      className="btn btn-outline-danger text-warning fw-bold"
                    >
                      Book Table
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
