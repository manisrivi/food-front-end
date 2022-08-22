import React, { useState } from "react";
import axios from "axios";
import FileBase64 from 'react-file-base64';


export default function TestDemo() {
  // form initialValues
  const [item, setItem] = useState ({
    name: "",
    desc: "",
    img: "",
    price: "",
    rating: "",
    offer: "",
  });
  console.log(item);
  // form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // api call
     await axios.post("http://localhost:6072/products", item);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
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
                onChange={event => setItem({ ...item, name: event.target.value })}
              />
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
                onChange={event => setItem({ ...item, desc: event.target.value })}
              />
            </div>
            {/* Image */}
            <div>
              <FileBase64
                type="text"
                name="img"
                placeholder="Image"
                className="form-control"
                onDone={({ base64 }) => setItem({ ...item, img: base64 })}
                required
              />
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
                onChange={event => setItem({ ...item, price: event.target.value })}
              />
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
                onChange={event => setItem({ ...item, rating: event.target.value })}
              />
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
                onChange={event => setItem({ ...item, offer: event.target.value })}
              />
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
      </div>
    </div>
  );
}
