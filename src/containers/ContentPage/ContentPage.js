// import files
import React from "react";
import "./ContentPage.css";
import image1 from "./Image/image1.png";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

// content page
export default function ContentPage({themeToggler}) {
  return (
    <div>
      <Navbar themeToggler={themeToggler}/>
      <div className="container mt-5">
        <div className="row justify-content-center">
          {/*Main Contant */}
          <div className="col-sm-6 col-lg-5">
            <h1 className="fw-bold text-danger">
              Noodle<span className="text-warning">Country</span>
            </h1>
            <p className="text-danger fw-bold">-Restaurant</p>
            <h1 className="MainContent_Text mb-3">
              Enjoy Delicious Food <br /> at Popular Prices
            </h1>
            <p className="text-secondary">
              get a variety of Noodles full of tempting flavors and <br /> cheap
              prices for various groups
            </p>
            <div className="d-flex gap-2">
            <Link
              to="/products"
              className="btn btn-outline-danger fw-bold text-warning"
            >
              Order Now
            </Link>
            <Link
              to="/booktable"
              className="btn btn-outline-danger fw-bold text-warning"
            >
              Book Table
            </Link>
            </div>
          </div>
          {/* MainPage Image */}
          <div className="col-sm-6 col-lg-5">
            <img className="w-100" src={image1} alt="image" />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col text-center">
            <div>
              <h3 className="fw-bold MainContent_Text">Our Awesome Service</h3>
            </div>
            <div className="d-flex justify-content-between gap-2">
              <div className="shadow-lg rounded-3 p-3 ">
                <span
                  class="iconify text-danger"
                  data-icon="dashicons:food"
                  data-width="40"
                ></span>
                <h6 className="fw-bold text-warning">Quality Food</h6>
              </div>
              <div className="shadow-lg rounded-3 p-3">
                <span
                  class="iconify text-danger"
                  data-icon="mdi:truck-delivery-outline"
                  data-width="40"
                ></span>
                <h6 className="fw-bold text-warning">Fast Delivery</h6>
              </div>
              <div className="shadow-lg rounded-3 p-3">
                <span
                  class="iconify text-danger"
                  data-icon="bxs:offer"
                  data-width="40"
                ></span>
                <h6 className="fw-bold text-warning">More Offers</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
