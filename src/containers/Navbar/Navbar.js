import React from "react";
import { useNavigate, Link } from "react-router-dom";



export default function Navbar() {
  const navigate = useNavigate();
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
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-5">
              <li class="nav-item">
                <Link className="fw-bold text-decoration-none text-dark MainContent_Text" to="/About">
                  About Us
                </Link>
              </li>
              <li class="nav-item">
                <Link className="fw-bold text-decoration-none text-dark MainContent_Text" to="/contact">
                  Contact
                </Link>
              </li>
              <li class="nav-item">
                <Link className="fw-bold text-decoration-none text-dark MainContent_Text" to="/login">
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link className="fw-bold text-decoration-none text-dark MainContent_Text" to="/admin">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
