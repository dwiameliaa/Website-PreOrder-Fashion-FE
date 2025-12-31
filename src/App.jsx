import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import PublicLayout from "./layouts/public";
import Home from "./pages/public";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Contact from "./pages/public/contact";
import PreOrder from "./pages/public/pre-order";
import Products from "./pages/public/products";
import ShowProduct from "./pages/public/products/show";
import AdminLayout from "./layouts/admin";
// import Dashboard from "./pages/admin";
import AdminUsers from "./pages/admin/users";
import AdminProducts from "./pages/admin/products";
import ProductCreate from "./pages/admin/products/create";
import UserEdit from "./pages/admin/users/edit";
import UserCreate from "./pages/admin/users/create";
import ProductEdit from "./pages/admin/products/edit";
import AdminOrders from "./pages/admin/orders";
import OrderCreate from "./pages/admin/orders/create";
import MyOrders from "./pages/public/my-orders";
import OrderEdit from "./pages/admin/orders/edit";
import AdminMeasurements from "./pages/admin/pre-orders";
import MeasurementDetail from "./pages/admin/pre-orders/detail";
import MeasurementCreate from "./pages/admin/pre-orders/create";
import MeasurementEdit from "./pages/admin/pre-orders/edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/measurements" element={<PreOrder />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* PRODUCTS */}
          <Route path="/products" element={<Outlet />}>
            <Route index element={<Products />} />
            <Route path="show/:id" element={<ShowProduct />} />
          </Route>
        </Route>

        {/* Admin */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminUsers />} />

            <Route path="products">
              <Route index element={<AdminProducts />} />
              <Route path="create" element={<ProductCreate />} />
              <Route path="edit/:id" element={<ProductEdit />} />
            </Route>

            <Route path="orders">
              <Route index element={<AdminOrders />} />
              <Route path="create" element={<OrderCreate />} />
              <Route path="edit/:id" element={<OrderEdit />} />
            </Route>

            <Route path="measurements">
              <Route index element={<AdminMeasurements />} />
              <Route path=":id" element={<MeasurementDetail />} />
              <Route path="create" element={<MeasurementCreate />} />
              <Route path="edit/:id" element={<MeasurementEdit />} />
            </Route>

            <Route path="users">
              <Route index element={<AdminUsers  />} />
              <Route path="edit/:id" element={<UserEdit />} />
              <Route path="create" element={<UserCreate />} />
            </Route>

          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
