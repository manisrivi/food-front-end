import "./App.css";
import ContentPage, { Good } from "./containers/ContentPage/ContentPage";
import Navbar from "./containers/Navbar/Navbar";
import { Routes as Routes, Route } from "react-router-dom";
import About from "./containers/AboutPage/About";
import Products from "./containers/Products/Products";
import LoginPage from "./containers/LoginPage/LoginPage";
import SignUpPage from "./containers/SignUpPage/SignUpPage";
import ContactPage from "./containers/ContactPage/ContactPage";
import ProductInfo from "./containers/ProductInfo/ProductInfo";
import Admin from "./containers/Admin/Admin";
import Cart from "./containers/CartPage.js/Cart";
import UserNavbar from "./containers/userNavbar/userNavbar";
import MyOrders from "./containers/MyOrders/MyOrders";
import Success from "./containers/PaymentSuccess/Success";

function App() {
  const authToken = window.localStorage.getItem("authToken");

  return (
    <div>
      <Routes>
        <Route path="/" element={<ContentPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/userNavbar" element={<UserNavbar />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/success" element={<Success />}/>
      </Routes>
    </div>
  );
}

export default App;
