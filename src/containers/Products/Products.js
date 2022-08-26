// import files
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../userNavbar/userNavbar";

// products page
export default function Products() {
  // navigate to page
  const navigate = useNavigate();

  // state management
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState(products);
  const [foo, setFoo] = useState(true);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // get product function & api call
  const getProducts = async () => {
    try {
      const authToken = window.localStorage.getItem("authToken");
      const { data } = await axios.get(`${ProductAPI}/products`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  // useEffect use refresh data
  useEffect(() => {
    getProducts();
  }, []);

  // Filter category
  const filterItem = (categItem) => {
    const updatedItem = products.filter((curElem) => {
      return curElem.category === categItem;
    });
    setItems(updatedItem);
  };
  const styles = {
    display: foo ? "block" : "none",
  };

  return (
    <div className="container">
      <UserNavbar />
      <div className="d-flex justify-content-between gap-5 mt-3 mb-3">
        <input
          type="text"
          className="form-control rounded w-50  ms-2"
          placeholder="Search food"
          onChange={(event) => setQuery(event.target.value)}
        />
        {/* <p className="text-center text-danger fw-bold mx-auto"> */}
        {/* -Most Popullar Items */}
        {/* </p> */}
        <div class="dropdown">
          <button
            class="btn btn-outline-success fw-bold"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
           -- Category --
          </button>
          <ul class="dropdown-menu">
            <li>
              <button
                class="dropdown-item"
                onClick={() => {
                  setItems(products);
                }}
              >
                All
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                onClick={() => {
                  setFoo(false);
                  filterItem("Chicken");
                }}
              >
                Chicken
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                onClick={() => {
                  setFoo(false);
                  filterItem("Green");
                }}
              >
                Green
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                onClick={() => {
                  setFoo(false);
                  filterItem("Kids");
                }}
              >
                Kids
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                onClick={() => {
                  setFoo(false);
                  filterItem("Pasta");
                }}
              >
                Pasta
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                onClick={() => {
                  setFoo(false);
                  filterItem("Fish");
                }}
              >
                Fish
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                onClick={() => {
                  setFoo(false);
                  filterItem("Soup");
                }}
              >
                Soup
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="row mx-auto">
        <div className="text-center">
          {isLoading && (
            <div className="">
              <img src="https://i.stack.imgur.com/hzk6C.gif" alt="" />
            </div>
          )}
        </div>
        {/* category
        <div className="row gap-3 ms-auto text-center mt-3">
          <div className="col-sm-2 col-md-3 col-lg-1 mx-auto">
            <button
              className="btn btn-outline-success fw-bold"
              onClick={() => {
                setItems(products);
              }}
            >
              All
            </button>
          </div>
          <div className="col-sm-2 col-md-3 col-lg-2 mx-auto">
            <button
              className="btn btn-outline-success fw-bold"
              onClick={() => {
                setFoo(false);
                filterItem("Chicken");
              }}
            >
              Chicken
            </button>
          </div>
          <div className="col-sm-2 col-md-3 col-lg-2 mx-auto">
            <button
              className="btn btn-outline-success fw-bold"
              onClick={() => {
                setFoo(false);
                filterItem("Green");
              }}
            >
              Green
            </button>
          </div>
          <div className="col-sm-2 col-md-3 col-lg-2 mx-auto">
            <button
              className="btn btn-outline-success fw-bold"
              onClick={() => {
                setFoo(false);
                filterItem("Kids");
              }}
            >
              Kids
            </button>
          </div>
          <div className="col-sm-2 col-md-3 col-lg-2 mx-auto">
            <button
              className="btn btn-outline-success fw-bold"
              onClick={() => {
                setFoo(false);
                filterItem("Pasta");
              }}
            >
              Pasta
            </button>
          </div>
          <div className="col-sm-2 col-md-3 col-lg-2 mx-auto">
            <button
              className="btn btn-outline-success fw-bold"
              onClick={() => {
                setFoo(false);
                filterItem("Fish");
              }}
            >
              Fish
            </button>
          </div>
        </div> */}

        {foo ? (
          <div className="row mx-auto">
            {products
              .filter((g) => g.name.toLowerCase().includes(query))
              .map((element) => (
                <ProductTemplate
                  _id={element._id}
                  key={element.id}
                  img={element.img.url}
                  name={element.name}
                />
              ))}
          </div>
        ) : (
          <div className="row mx-auto">
            {items
              .filter((g) => g.name.toLowerCase().includes(query))
              .map((element) => (
                <ProductTemplate
                  _id={element._id}
                  key={element.id}
                  img={element.img.url}
                  name={element.name}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

// products template
function ProductTemplate({ name, img, _id }) {
  const navigate = useNavigate();
  return (
    <div className="col-lg-4 col-md-6 mx-auto">
      <div class="mt-4 ms-auto product_temp_card border-0 shadow-lg rounded-5 mx-auto gap-1 text-center p-2 cur">
        <img
          src={img}
          class="card-img-top rounded-3"
          height={"170px"}
          alt="..."
          onClick={() => navigate("/product/" + _id)}
        />
        <h6 className="fw-bold">{name}</h6>
      </div>
    </div>
  );
}
