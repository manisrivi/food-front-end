import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
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
          <h5 className="text-center">Admin</h5>
          <span
            class="iconify text-primary"
            data-icon="clarity:administrator-solid"
            data-width="70"
          ></span>
          <form className="mb-3 mt-2">
            <div className="d-flex flex-column gap-3">
              {/* email */}
              <div>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value="admin@noodlecountry.com"
                  id="email"
                  placeholder="Email"
                />
              </div>
              {/* Password */}
              <div>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value="admin@12"
                  id="password"
                  placeholder="Password"
                />
              </div>
              {/* button */}
              <div className="">
                <button
                  type="submit"
                  className="w-100 btn btn-outline-danger text-warning fw-bold"
                  onClick={() => navigate("/adminHome")}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
