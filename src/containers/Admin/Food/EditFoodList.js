import React from "react";
import AdminNavbar from "../AdminCommonFiles/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ProductAPI } from "../../../Global files/ProductsAPI";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Edit FoodList function

export function EditFoodList() {
  // state management
  const { id } = useParams();
  const [food, setFood] = useState(null);

  // edit food api call
  const editFood = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/products/${id}`);
      setFood(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    editFood();
  });

  return (
    <div className="container">
      {food ? (
        <EditFoodForm food={food} />
      ) : (
        <div className="progress mt-3">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "75%" }}
          ></div>
        </div>
      )}
    </div>
  );
}
// Edit Food list form function

export function EditFoodForm({ food }) {
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

  // image file converted to string
  const onLoad = (fileString) => {
    setImage(fileString);
    setbase64code = fileString;
  };

  // image file reader
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  // state management
  const [name, setName] = useState(food.name);
  const [img, setImg] = useState(food.img);
  const [desc, setDesc] = useState(food.desc);
  const [price, setPrice] = useState(food.price);
  const [rating, setRating] = useState(food.rating);
  const [offer, setOffer] = useState(food.offer);

  // edit food update form and api call
  const editfood = () => {
    const updateFood = {
      name: name,
      img: img,
      desc: desc,
      price: price,
      rating: rating,
      offer: offer,
    };
    fetch(`${ProductAPI}/products/${food._id}`, {
      method: "PUT",
      body: JSON.stringify(updateFood),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => navigate("/foodList"));
  };

  return (
    <div className="container">
      <AdminNavbar />
      <div className="row justify-content-center m-2 mt-5 mx-auto gap-3">
        <div className="col-sm-4 col-md-6 col-lg-4 p-3 rounded-5 shadow-lg p-4 mx-auto">
          <h5 className="text-center MainContent_Text">Edit Food List</h5>
          {/* name */}
          <input
            className="mt-2 form-control"
            value={name}
            type="text"
            placeholder="name"
            onChange={(event) => setName(event.target.value)} />
          {/* image file */}
          <input
            className="mt-2 form-control"
            type="file"
            onChange={imghandleSubmit} />
          {/* iamge link */}
          <input
            className="mt-2 form-control"
            value={image}
            type="text"
            placeholder="Image"
            onChange={(event) => setImg(event.target.value)} />
          {/* description */}
          <input
            className="mt-2 form-control"
            value={desc}
            type="text"
            placeholder="Description"
            onChange={(event) => setDesc(event.target.value)} />
          {/* price */}
          <input
            className="mt-2 form-control"
            value={price}
            type="number"
            placeholder="Price"
            onChange={(event) => setPrice(event.target.value)} />
          {/* rating */}
          <input
            className="mt-2 form-control"
            value={rating}
            type="number"
            placeholder="Rating"
            onChange={(event) => setRating(event.target.value)} />
          {/* offer */}
          <input
            className="mt-2 form-control"
            value={offer}
            type="number"
            placeholder="offer"
            onChange={(event) => setOffer(event.target.value)} />
          {/* submit button */}
          <button
            className="btn btn-outline-success fw-bold mt-2 form-control"
            onClick={editfood}
          >
            UPDATE
          </button>
        </div>
        <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
          <img
            src="https://www.excelsisdeo.com/images/AlphaTestersAnimation_60.gif"
            className="w-100"
            alt="" />
        </div>
      </div>
    </div>
  );
}
