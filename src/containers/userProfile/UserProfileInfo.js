import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../userNavbar/userNavbar";
import axios from "axios";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function UserProfileInfo() {
  // state management
  const [base64code, setbase64code] = useState("");
  const [image, setImage] = useState("");

  // image handle function
  const imghandleSubmit = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };

  // image to string converted function
  const onLoad = (fileString) => {
    setImage(fileString);
    setbase64code = fileString;
  };

  // Image file reader function
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };
  // navigate to page
  const navigate = useNavigate();

  // user details state management
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // User Profile Update Schema
  const UserProfileUpdateSchema = Yup.object().shape({
    fullname: Yup.string().required(),
    contactnumber: Yup.number().required().positive().integer(),
    address: Yup.string().required(),
    // img: Yup.string().required(),
  });

  // authtoken localStorage
  const authToken = window.localStorage.getItem("authToken");

  // get users details and api call
  const getUserProfile = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/users/id`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <UserNavbar />
      <div className="container">
        <div className="row mx-auto mt-3">
          {/* Profile details */}
          <div className="col-sm-4 col-md-6 col-lg-4 mx-auto text-center">
            <div className="text-center">
              {isLoading && (
                <div className="">
                  <img
                    className="w-100"
                    src="https://i.stack.imgur.com/hzk6C.gif"
                    alt=""
                  />
                </div>
              )}
            </div>
            <img src={users.img?.url} alt="" className="w-75 rounded-2" />
            <h5 className="text-danger mt-3">
              Full name:{" "}
              <span className="text-secondary">{users.fullname}</span>
            </h5>
            <h5 className="text-danger">
              Email Id: <span className="text-secondary">{users.email}</span>
            </h5>
            <h5 className="text-danger">
              Contact-Number:{" "}
              <span className="text-secondary">{users.contactnumber} </span>
            </h5>
            <h5 className="text-danger">
              Address: <span className="text-secondary">{users.address}</span>
            </h5>
          </div>
          {/* profile Edit */}
          <div className="col-sm-4 col-md-6 col-lg-4 p-3 rounded-5 shadow-lg p-4 border">
            {/* Formik validation */}
            <Formik
              initialValues={{
                fullname: "",
                contactnumber: "",
                address: "",
              }}
              validationSchema={UserProfileUpdateSchema}
              onSubmit={async (values, { resetForm }) => {
                const formValues = {
                  fullname: values.fullname,
                  contactnumber: values.contactnumber,
                  address: values.address,
                  img: image
                }
                const form = {
                  email: users.email,
                  message: `
                <h1 style="text-align: center;">Welcome To <span style="color:red;">Noodle</span><span style="color:#FFD700;">Country</span> Restaurant</h1>
                <h4 style="color:#008000; text-align: center;">Profile Updated Successfully</h4> <br/>
                <br/>
                Best Wishes!!! <br/>
                <h3><span style="color:red;">Noodle</span><span style="color:yellow;">Country</span></h3> -- Restaurant --
                `,
                  subject: "Profile Update",
                  name: `"Hi", ${values.fullname}`,
                };
                try {
                  // Register api call
                  await axios.put(`${ProductAPI}/users/id`, formValues, {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  });

                  // send mail to user api call
                  await axios.post(`${ProductAPI}/auth/sendmail`, form);
                  getUserProfile();
                  resetForm({ values: "" });
                  toast.success("Profile Updated Successfully");
                } catch ({ response: { data } }) {
                  toast.error(data.error);
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="d-flex flex-column gap-2 text-center">
                  <h4 className="MainContent_Text">Update your profile</h4>
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
                      value={users.email}
                      disabled
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <span className="text-danger text-start">
                      *{errors.email}*
                    </span>
                  ) : null}
                  {/* address */}
                  <div>
                    <Field
                      component="textarea"
                      className="form-control"
                      name="address"
                      placeholder="Address"
                    />
                  </div>
                  {errors.message && touched.message ? (
                    <span className="text-danger text-start">
                      *{errors.message}*
                    </span>
                  ) : null}
                  {/* Image file */}
                  <div>
                    <input
                      type="file"
                      className="form-control"
                      onChange={imghandleSubmit}
                    />
                  </div>

                  {/* submit Button */}
                  <button
                    type="submit"
                    className="btn btn-outline-danger text-warning fw-bold"
                  >
                    Update Profile
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
