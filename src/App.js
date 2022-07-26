import "./App.css";
import ContentPage from "./containers/ContentPage/ContentPage";
import { Routes as Routes, Route } from "react-router-dom";
import About from "./containers/AboutPage/About";
import Products from "./containers/Products/Products";
import LoginPage from "./containers/LoginPage/LoginPage";
import SignUpPage from "./containers/SignUpPage/SignUpPage";
import ContactPage from "./containers/ContactPage/ContactPage";
import ProductInfo from "./containers/ProductInfo/ProductInfo";
import Admin from "./containers/Admin/AdminCommonFiles/AdminLogin";
import Cart from "./containers/CartPage.js/Cart";
import UserNavbar from "./containers/userNavbar/userNavbar";
import MyOrders, { UserOrdersInfo } from "./containers/MyOrders/MyOrders";
import Success from "./containers/PaymentSuccess/Success";
import AdminHome from "./containers/Admin/AdminCommonFiles/AdminHome";
import UserList from "./containers/Admin/User/UserList";
import { UserInfo } from "./containers/Admin/User/UserInfo";
import FoodList from "./containers/Admin/Food/FoodList";
import { EditFoodList } from "./containers/Admin/Food/EditFoodList";
import { AddFoodList } from "./containers/Admin/Food/AddFoodList";
import OrderList from "./containers/Admin/Order/OrderList";
import { EditOrderList } from "./containers/Admin/Order/EditOrderList";
import { OrdersInfo } from "./containers/Admin/Order/OrdersInfo";
import AdminNavbar from "./containers/Admin/AdminCommonFiles/AdminNavbar";
import ForgetPassword from "./containers/ForgetPassword/ForgetPassword";
import ResetPassword from "./containers/ForgetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookTable from "./containers/BookTable/BookTable";
import TableBook from "./containers/Admin/TableBooking/TableBookList";
import { EditTableList } from "./containers/Admin/TableBooking/EditTableList";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./Global files/themes";
import { useState } from "react";
import UserProfileInfo from "./containers/userProfile/UserProfileInfo";
import TestDemo from "./TestDemo";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

function App() {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <div>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <StyledApp>
          <Routes>
            <Route
              path="/"
              element={<ContentPage themeToggler={themeToggler} />}
            />
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
            <Route path="/userProfileInfo" element={<UserProfileInfo />}/>
            <Route path="/userOrdersInfo/:id" element={<UserOrdersInfo />} />
            <Route path="/success" element={<Success />} />
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/adminNavbar" element={<AdminNavbar />} />
            <Route path="/userList" element={<UserList />} />
            <Route path="/users/:id" element={<UserInfo />} />
            <Route path="/orderList" element={<OrderList />} />
            <Route path="/orders/:id" element={<OrdersInfo />} />
            <Route path="/editOrderList/edit/:id" element={<EditOrderList />} />
            <Route path="/foodList" element={<FoodList />} />
            <Route path="/addFoodList" element={<AddFoodList />} />
            <Route path="/editFoodList/edit/:id" element={<EditFoodList />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />
            <Route path="/booktable" element={<BookTable />} />
            <Route path="tablebook" element={<TableBook />} />
            <Route path="/editTableList/edit/:id" element={<EditTableList />} />
            <Route path="testdemo" element={<TestDemo/>}/>
          </Routes>
        </StyledApp>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
