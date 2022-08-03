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
import Admin from "./containers/Admin/AdminLogin";
import Cart from "./containers/CartPage.js/Cart";
import UserNavbar from "./containers/userNavbar/userNavbar";
import MyOrders from "./containers/MyOrders/MyOrders";
import Success from "./containers/PaymentSuccess/Success";
import AdminHome from "./containers/Admin/AdminHome";
import UserList, { EditUserInfo, UserInfo } from "./containers/Admin/UserList";
import FoodList, { AddFoodList, EditFoodList } from "./containers/Admin/FoodList";
import OrderList, { OrdersInfo } from "./containers/Admin/OrderList";
import AdminNavbar from "./containers/Admin/AdminNavbar";
import Sample from "./containers/sample";
import ForgetPassword from "./containers/ForgetPassword/ForgetPassword";
import ResetPassword from "./containers/ForgetPassword/ResetPassword";

function App() {
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
        <Route path="/success" element={<Success />}/>
        <Route path="/adminHome" element={<AdminHome />}/>
        <Route path="/adminNavbar" element={<AdminNavbar />}/>
        <Route path="/userList" element={<UserList />}/>
        <Route path="/users/:id" element={<UserInfo/>}/>
        <Route path="/orderList" element={<OrderList />}/>
        <Route path="/orders/:id" element={<OrdersInfo/>}/>
        <Route path="/foodList" element={<FoodList />}/>
        <Route path="/addFoodList" element={<AddFoodList/>}/>
        <Route path="/editFoodList/edit/:id" element={<EditFoodList/>}/>
        <Route path="sample" element={<Sample/>}/>
        <Route path="/forgetpassword" element={<ForgetPassword/>}/>
        <Route path="/resetpassword" element={<ResetPassword />}/>
        {/* <Route path="/myorders" element={<MyOrders />} /> */}
      </Routes>
    </div>
  );
}

export default App;
