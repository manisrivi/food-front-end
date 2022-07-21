import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserNavbar() {
  const authToken = window.localStorage.getItem("authToken");
  const navigate = useNavigate();
  const Logout = () => {
    window.localStorage.clear();
    navigate("/login");
  }
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-white text-center mt-1">
        <div class="container">
          <Link class="navbar-brand fw-bold text-danger" to="/">
            Noodle<span className="text-warning">Country</span>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            <li class="nav-item">
                <Link
                  className="btn btn-outline-light bg-white border-0 fw-bold text-decoration-none text-dark MainContent_Text"
                  to="/products"
                >
                  Noodles
                </Link>
              </li>
            <li class="nav-item">
                <Link
                  className="btn btn-outline-light bg-white border-0 fw-bold text-decoration-none text-dark MainContent_Text"
                  to="/myorders"
                >
                  My Orders
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  className="btn btn-outline-light bg-white border-0 fw-bold text-decoration-none text-dark MainContent_Text"
                  to="/" onClick={Logout}
                >
                  Logout
                </Link>
              </li>
              <li class="nav-item">
                <button
                  type="button"
                  class="btn btn-outline-light text-danger border-0 position-relative"
                  onClick={() => navigate("/cart")}
                >
                  <span
                    class="iconify"
                    data-icon="dashicons:food"
                    data-width="30"
                  ></span>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                    {quantity}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}