import React from "react";
import AdminNavbar from "../AdminCommonFiles/AdminNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductAPI } from "../../../Global files/ProductsAPI";
import { useNavigate, useParams } from "react-router-dom";

// user individual Information

export function UserInfo() {
  // navigate to page
  const navigate = useNavigate();
  // user state management
  const { id } = useParams();
  const [users, setUsers] = useState({});

  // user info & api call
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/users/${id}`);
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    getUserInfo();
  }, [id]);

  return (
    <div className="container">
      <AdminNavbar />
      <h6 className="text-center text-danger fw-bold mt-3">
        --User Personal Information
      </h6>
      <div className="row justify-content-center p-2">
        <div className="col mt-5 MainContent_Text">
          <h4>
            FullName: <span className="text-primary">{users.fullname}</span>
          </h4>
          <h4>
            Email: <span className="text-primary">{users.email}</span>
          </h4>
          <h4>
            Contact-Number:{" "}
            <span className="text-primary">{users.contactnumber}</span>
          </h4>
          <h4>
            Create-Date/Time:{" "}
            <span className="text-primary">
              {users.date} - {users.time}
            </span>
          </h4>
        </div>
        <div className="col">
          <img
            src="https://i.pinimg.com/originals/0a/f3/c9/0af3c9613761d2d2394d99312aeba397.gif"
            alt="" />
        </div>
      </div>
    </div>
  );
}
