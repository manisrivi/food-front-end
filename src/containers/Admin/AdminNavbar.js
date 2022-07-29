import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function AdminNavbar() {
    const navigate = useNavigate();
  return (
    <div>
         <nav class="navbar navbar-expand-lg bg-white text-center mt-1">
        <div class="container">
          <Link class="navbar-brand fw-bold text-danger" to="/adminHome">
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
                  to="/"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
