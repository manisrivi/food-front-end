import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { useNavigate, Link } from "react-router-dom";
import UserNavbar from "../userNavbar/userNavbar";


export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] =  useState(true);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/products`);
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="container">
      <UserNavbar/>
      <div className="d-flex justify-content-between">
      <input
          type="text"
          className="mx-auto rounded-2 w-25 px-4"
          placeholder="Search food"
          onChange={(event) => setQuery(event.target.value)}
        />
      <p className="text-center text-danger fw-bold mx-auto">-Most Popullar Items</p>
      </div>
      <div className="row ms-auto">
        <div className="text-center">
      {isLoading && (
            <div className="">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                alt=""
              />
            </div>
          )}</div>
        {products.filter((g) => g.name.toLowerCase().includes(query)).map((element) => (
          <ProductTemplate
            _id={element._id}
            key={element.id}
            img={element.img}
            name={element.name}
            price={element.price}
          />
        ))}
      </div>
    </div>
  );
}

function ProductTemplate({ name, img, _id }) {
  const navigate = useNavigate();
  return (
    <div className="col-lg-4 col-md-6">
      <div class="mt-5 product_temp_card border-0 shadow-lg rounded-5 mx-auto gap-1 text-center p-2">
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
