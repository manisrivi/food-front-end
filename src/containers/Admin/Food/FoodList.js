// import files
import React from "react";
import AdminNavbar from "../AdminCommonFiles/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ProductAPI } from "../../../Global files/ProductsAPI";
import { useEffect } from "react";

// Food List
export default function FoodList() {
    // authToken
  const adminauthToken = window.localStorage.getItem("adminauthToken");
  
  const [query, setQuery] = useState("");
  // navigate to page
  const navigate = useNavigate();
  // user details state management
  const [foodList, setFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // get food details
  const getFoodList = async () => {
    try {
      // api call & state management
      const { data } = await axios.get(`${ProductAPI}/products`,{
        headers: {
          Authorization: `Bearer ${adminauthToken}`,
        },
      });
      setFoodList(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete food
  const deleteFood = async ({ name, _id }) => {
    // api call & state management
    if (window.confirm(`Are You Sure Delete This User ${name}`)) {
      try {
        await axios.delete(`${ProductAPI}/products/${_id}`, { _id });
        alert("Deleted Successfully");
        getFoodList();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    getFoodList();
  }, []);

  return (
    <div className="container">
      <AdminNavbar />
      <div className="d-flex justify-content-between mb-3 gap-0 mt-2 mx-auto mt-2">
        <input
          type="text"
          className="px-2 rounded-2 w-25"
          placeholder="Search food"
          onChange={(event) => setQuery(event.target.value)}
        />
        <h6 className="text-center fw-bold text-danger">
          --All Food Informations
        </h6>
        <button
          className="btn btn-outline-danger text-warning fw-bold"
          onClick={() => navigate("/addFoodList")}
        >
          Add Food
        </button>
      </div>
      <div className="row table-responsive">
        {/* food list Table */}
        <table className="text-center table">
          <thead className="bg-success bg-opacity-75 text-warning">
            <tr>
              <th>Image</th>
              <th>Product-Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Offer</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          {isLoading && (
            <div className="">
              <img src="https://i.stack.imgur.com/hzk6C.gif" alt="" />
            </div>
          )}
          <tbody className="bg-light">
            {foodList
              .filter((g) => g.name.toLowerCase().includes(query))
              .map((u, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={u.img.url} alt="" className="w-25" />
                    </td>
                    <td className="text-start">{u._id}</td>
                    <td className="text-start">{u.name}</td>
                    <td>{u.price}</td>
                    <td>{u.rating}</td>
                    <td>{u.offer}</td>
                    <td className="text-start">{u.desc}</td>
                    <td>
                      <button
                        className="btn btn-outline-white border-0"
                        onClick={() => navigate("/editFoodList/edit/" + u._id)}
                      >
                        <span
                          class="iconify text-warning"
                          data-icon="entypo:edit"
                        ></span>
                      </button>
                      <button
                        className="btn btn-outline-white border-0"
                        onClick={() => deleteFood(u)}
                      >
                        <span
                          class="iconify text-danger"
                          data-icon="ant-design:delete-filled"
                        ></span>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
