// import files
import React from "react";
import { Link } from "react-router-dom";

// About Page
export default function About() {
  return (
    <div>
      {/* Navbar */}
      <nav class="navbar bg-white">
        <div class="container">
          <span class="navbar-brand mb-0 h1">
            <Link class="text-decoration-none fw-bold text-danger" to="/">
              Noodle<span className="text-warning">Country</span>
            </Link>{" "}
          </span>
        </div>
      </nav>
      <div className="row mt-4 justify-content-center">
        {/* About img */}
        <div className="col-sm-6 text-end">
          <img
            className="w-50"
            src="https://pngimg.com/uploads/noodle/noodle_PNG63.png"
            alt=""
          />
        </div>
        {/* About content */}
        <div className="col-sm-6 px-5">
          <p className="text-danger fw-bold">- About Us</p>
          <h2 className="MainContent_Text">
            Simple Way of <br /> Eating Delicious
          </h2>
          <p className="text-secondary">
            You can try several types of this simple dish. You <br /> also
            easily apply it, especially for those of you <br /> who are
            beginners.
          </p>
        </div>
      </div>
    </div>
  );
}
