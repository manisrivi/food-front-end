import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { useNavigate, Link } from "react-router-dom";
import UserNavbar from "../userNavbar/userNavbar";


export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/products`);
      setProducts(data);
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
      <p className="text-center text-danger fw-bold">-Most Popullar Items</p>
      <div className="row ms-auto">
        {products.map((element) => (
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
