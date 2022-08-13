// import files
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Mui components import
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

// navbar page
export default function Navbar({ themeToggler }) {
  // navigate to page
  const navigate = useNavigate();
  return (
    <div>
      <nav class="navbar navbar-expand-lg text-center mt-1">
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
              <li class="nav-item d-flex gap-1">
                <span
                  class="iconify text-success"
                  data-icon="ant-design:phone-filled"
                  data-width="30"
                ></span>
                <h5 className="text-success fw-bold">01-2345-625</h5>
              </li>
            </ul>
          </div>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-5">
              <li class="nav-item">
                <Link
                  className="fw-bold text-decoration-none text-danger"
                  to="/About"
                >
                  About Us
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  className="fw-bold text-decoration-none text-danger"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  className="fw-bold text-decoration-none text-danger"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  className="fw-bold text-decoration-none text-danger"
                  to="/admin"
                >
                  Admin
                </Link>
              </li>
              <li class="nav-item">
                {/* toggle start */}
                <FormControlLabel
                  control={
                    <MaterialUISwitch
                      sx={{}}
                      defaultChecked
                      onClick={() => themeToggler()}
                    />
                  }
                  label=""
                />
                {/* toggle end */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
