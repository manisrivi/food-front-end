import React from "react";
import { Link } from "react-router-dom";

export default function ContactPage() {
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
        <div className="col-sm-4 col-md-6 col-lg-4 rounded-5 shadow-lg p-4">
          <form className="mb-3">
            <div className="d-flex flex-column gap-3 text-center">
              {/* heading */}
              <h5 className="MainContent_Text">Reach Us</h5>
              {/* your name */}
              <div>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                />
              </div>
              {/* your email */}
              <div>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
              </div>
              {/* your contactno */}
              <div>
                <input
                  className="form-control"
                  type="number"
                  name="contactno"
                  id="contactno"
                  placeholder="Contact Number"
                />
              </div>
              {/* your message */}
              <div>
                <textarea
                  className="form-control"
                  type="text"
                  name="message"
                  id="message"
                  placeholder="Message"
                />
              </div>
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
          </form>
        </div>
      </div>
    </div>
  );
}
