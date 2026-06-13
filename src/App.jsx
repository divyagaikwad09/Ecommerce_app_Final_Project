import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminUsers from "./admin/AdminUsers";
import AdminOrders from "./admin/AdminOrders";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import AddUser from "./admin/AddUser";
import EditUser from "./admin/EditUser";
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/admin" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/users" element={<AdminUsers />} />

        <Route path="/admin/orders" element={<AdminOrders />} />

        <Route path="/add-product" element={<AddProduct />} />
        <Route
          path="/edit-product/:id"
          element={<EditProduct />}
        />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/add-user" element={<AddUser />} />
        <Route path="/admin/edit-user/:id" element={<EditUser />} />      </Routes>
    </>
  );
}

export default App;