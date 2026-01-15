
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";
import { FALLBACK_IMAGE, handleImageError } from "../utils/fallbackImage";
import { Link, useNavigate, useLocation } from "react-router-dom";


const Admin = () => {
  const navigate = useNavigate();
   const location = useLocation();
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    imageUrl: "",
    imageData: ""
  });

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);

  const token = localStorage.getItem("token");

  const axiosAuth = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    const res = await axiosAuth.get("http://localhost:5000/api/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    if (activeTab === "products") fetchProducts();
    if (activeTab === "orders") fetchOrders();
  }, [activeTab]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      alert("Only images smaller than 5 MB allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setForm(prev => ({ ...prev, imageData: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description,
      category: form.category,
      stock: Number(form.stock),
      image: form.imageData || form.imageUrl
    };

    if (editingId) {
      await axiosAuth.put(`http://localhost:5000/api/products/${editingId}`, productData);
    } else {
      await axiosAuth.post("http://localhost:5000/api/products", productData);
    }

    resetForm();
    fetchProducts();
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "",
      imageUrl: "",
      imageData: ""
    });
    setImagePreview(null);
    setEditingId(null);
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
      stock: p.stock,
      imageUrl: "",
      imageData: p.image
    });
    setImagePreview(p.image);
    setEditingId(p._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axiosAuth.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">⚙️ Admin Dashboard</h1>

  
<div className="admin-tabs">
  <button
    className={activeTab === "products" ? "active tab-btn" : "tab-btn"}
    onClick={() => setActiveTab("products")}
  >
    Products
  </button>

  <button
    className={activeTab === "bulk" ? "active tab-btn" : "tab-btn"}
    onClick={() => setActiveTab("bulk")}
  >
    Bulk Upload
  </button>


  <Link
    to="/my-orders"
    className={location.pathname === "/my-orders" ? "active tab-btn" : "tab-btn"}
  >
    My Orders
  </Link>

  <button
    className="tab-btn create-admin-btn"
    onClick={() => navigate("/admin/create-admin")}
  >
    👤 Create Admin
  </button>
</div>

      {activeTab === "products" && (
        <>
          <form className="product-form" onSubmit={handleSubmit}>
            {["name", "price", "description", "category", "stock"].map(f =>
              f === "description" ? (
                <textarea key={f} placeholder={f} value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} />
              ) : (
                <input key={f} placeholder={f} value={form[f]} type={f === "price" || f === "stock" ? "number" : "text"} onChange={e => setForm({ ...form, [f]: e.target.value })} />
              )
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <img src={imagePreview || FALLBACK_IMAGE} onError={handleImageError} alt="preview" />
            <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
            {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
          </form>

          <table className="products-table">
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>{p.category}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button onClick={() => handleEdit(p)}>Edit</button>
                    <button onClick={() => handleDelete(p._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "orders" && (
        <>
          <h2>All Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map(o => (
              <div key={o._id} className="order-card">
                <h4>Order #{o._id.slice(-6)}</h4>
                <p><strong>User:</strong> {o.user?.name}</p>
                <p><strong>Total:</strong> ₹{o.totalPrice}</p>
                <p><strong>Status:</strong> {o.paymentStatus || "Pending"}</p>
                {o.orderItems.map((i, idx) => (
                  <p key={idx}>{i.name} × {i.qty} — ₹{i.price * i.qty}</p>
                ))}
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Admin;

