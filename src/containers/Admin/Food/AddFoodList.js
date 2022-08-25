import React from "react";
import AdminNavbar from "../AdminCommonFiles/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ProductAPI } from "../../../Global files/ProductsAPI";
import { useReducer } from "react";
import { formReducer } from "../../../Global files/formReducer";

// Add Food function

export function AddFoodList() {
  // authToken
  const adminauthToken = window.localStorage.getItem("adminauthToken");

  // navigate to page
  const navigate = useNavigate();
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

  // form initialValues
  const [food, setFood] = useReducer(formReducer, {
    name: "",
    desc: "",
    img: image,
    price: "",
    rating: "",
    offer: "",
  });

  // form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // api call
      await axios.post(`${ProductAPI}/products`, food,{
        headers: {
          Authorization: `Bearer ${adminauthToken}`,
        },
      });
      navigate("/foodList");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <AdminNavbar />
      <div className="row justify-content-center m-2 mt-5">
        <div className="col-sm-4 col-md-6 col-lg-4 p-3 mx-auto gap-3 rounded-5 shadow-lg p-4">
          <form
            className="d-flex flex-column gap-3 text-center"
            onSubmit={handleSubmit}
          >
            <h4 className="MainContent_Text">Add Food</h4>
            {/* Food name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Food Name"
                id="name"
                required
                className="form-control"
                onChange={setFood} />
            </div>
            {/*  description */}
            <div>
              <input
                type="text"
                name="desc"
                className="form-control"
                placeholder="Description"
                id="desc"
                required
                onChange={setFood} />
            </div>
            {/* Base64 */}
            <div>
              <input
                type="file"
                className="form-control"
                required
                onChange={imghandleSubmit} />
            </div>
            {/* Image */}
            <div>
              <input
                type="text"
                name="img"
                placeholder=""
                className="form-control"
                id="img"
                value={image}
                onChange={setFood}
                required />
            </div>
            {/* Price */}
            <div>
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="form-control"
                id="price"
                required
                onChange={setFood} />
            </div>
            {/*  Rating */}
            <div>
              <input
                type="number"
                name="rating"
                placeholder="Rating"
                className="form-control"
                id="rating"
                required
                onChange={setFood} />
            </div>
            {/*  offer */}
            <div>
              <input
                type="number"
                name="offer"
                placeholder="offer"
                className="form-control"
                id="offer"
                required
                onChange={setFood} />
            </div>
            {/* submit Button */}
            <button
              type="submit"
              className="btn btn-outline-danger text-warning fw-bold"
            >
              Add Food
            </button>
          </form>
        </div>
        <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
          <img
            src="https://pirscapital.com/wp-content/themes/pirscapital-v1/assets/images/gif-1-Revised.gif"
            className="w-100"
            alt="" />
        </div>
      </div>
    </div>
  );
}
