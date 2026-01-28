import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Chatbot from "./pages/Chatbot";
import Admin from "./pages/Admin";
import CreateAdmin from "./pages/CreateAdmin";
import MyOrders from "./pages/MyOrders";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Auth />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-admin"
          element={
            <AdminRoute>
              <CreateAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/my-orders" element={<MyOrders />} /> */}
<Route
  path="/my-orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>

      </Routes>
      <Chatbot />
    </BrowserRouter>
  );
}