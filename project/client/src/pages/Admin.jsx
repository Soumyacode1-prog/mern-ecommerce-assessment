
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./Admin.css";
// // import { FALLBACK_IMAGE, handleImageError } from "../utils/fallbackImage";
// // import { Link, useNavigate, useLocation } from "react-router-dom";


// // const Admin = () => {
// //   const navigate = useNavigate();
// //    const location = useLocation();
// //   const [activeTab, setActiveTab] = useState("products");
// //   const [products, setProducts] = useState([]);
// //   const [orders, setOrders] = useState([]);

// //   const [form, setForm] = useState({
// //     name: "",
// //     price: "",
// //     description: "",
// //     category: "",
// //     stock: "",
// //     imageUrl: "",
// //     imageData: ""
// //   });

// //   const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
// //   const [imagePreview, setImagePreview] = useState(null);
// //   const [editingId, setEditingId] = useState(null);

// //   const [file, setFile] = useState(null);
// //   const [previewData, setPreviewData] = useState([]);

// //   const token = localStorage.getItem("token");

// //   const axiosAuth = axios.create({
// //     headers: { Authorization: `Bearer ${token}` }
// //   });

// //   const fetchProducts = async () => {
// //     const res = await axios.get("http://localhost:5000/api/products");
// //     setProducts(res.data);
// //   };

// //   const fetchOrders = async () => {
// //     const res = await axiosAuth.get("http://localhost:5000/api/orders");
// //     setOrders(res.data);
// //   };

// //   useEffect(() => {
// //     if (activeTab === "products") fetchProducts();
// //     if (activeTab === "orders") fetchOrders();
// //   }, [activeTab]);

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     if (file.size > MAX_IMAGE_SIZE) {
// //       alert("Only images smaller than 5 MB allowed.");
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setImagePreview(reader.result);
// //       setForm(prev => ({ ...prev, imageData: reader.result }));
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const productData = {
// //       name: form.name.trim(),
// //       price: Number(form.price),
// //       description: form.description,
// //       category: form.category,
// //       stock: Number(form.stock),
// //       image: form.imageData || form.imageUrl
// //     };

// //     if (editingId) {
// //       await axiosAuth.put(`http://localhost:5000/api/products/${editingId}`, productData);
// //     } else {
// //       await axiosAuth.post("http://localhost:5000/api/products", productData);
// //     }

// //     resetForm();
// //     fetchProducts();
// //   };

// //   const resetForm = () => {
// //     setForm({
// //       name: "",
// //       price: "",
// //       description: "",
// //       category: "",
// //       stock: "",
// //       imageUrl: "",
// //       imageData: ""
// //     });
// //     setImagePreview(null);
// //     setEditingId(null);
// //   };

// //   const handleEdit = (p) => {
// //     setForm({
// //       name: p.name,
// //       price: p.price,
// //       description: p.description,
// //       category: p.category,
// //       stock: p.stock,
// //       imageUrl: "",
// //       imageData: p.image
// //     });
// //     setImagePreview(p.image);
// //     setEditingId(p._id);
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete this product?")) return;
// //     await axiosAuth.delete(`http://localhost:5000/api/products/${id}`);
// //     fetchProducts();
// //   };

// //   return (
// //     <div className="admin-container">
// //       <h1 className="admin-title">⚙️ Admin Dashboard</h1>

  
// // <div className="admin-tabs">
// //   <button
// //     className={activeTab === "products" ? "active tab-btn" : "tab-btn"}
// //     onClick={() => setActiveTab("products")}
// //   >
// //     Products
// //   </button>

// //   <button
// //     className={activeTab === "bulk" ? "active tab-btn" : "tab-btn"}
// //     onClick={() => setActiveTab("bulk")}
// //   >
// //     Bulk Upload
// //   </button>


// //   <Link
// //     to="/my-orders"
// //     className={location.pathname === "/my-orders" ? "active tab-btn" : "tab-btn"}
// //   >
// //     My Orders
// //   </Link>

// //   <button
// //     className="tab-btn create-admin-btn"
// //     onClick={() => navigate("/admin/create-admin")}
// //   >
// //     👤 Create Admin
// //   </button>
// // </div>

// //       {activeTab === "products" && (
// //         <>
// //           <form className="product-form" onSubmit={handleSubmit}>
// //             {["name", "price", "description", "category", "stock"].map(f =>
// //               f === "description" ? (
// //                 <textarea key={f} placeholder={f} value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} />
// //               ) : (
// //                 <input key={f} placeholder={f} value={form[f]} type={f === "price" || f === "stock" ? "number" : "text"} onChange={e => setForm({ ...form, [f]: e.target.value })} />
// //               )
// //             )}
// //             <input type="file" accept="image/*" onChange={handleImageChange} />
// //             <img src={imagePreview || FALLBACK_IMAGE} onError={handleImageError} alt="preview" />
// //             <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
// //             {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
// //           </form>

// //           <table className="products-table">
// //             <tbody>
// //               {products.map(p => (
// //                 <tr key={p._id}>
// //                   <td>{p.name}</td>
// //                   <td>₹{p.price}</td>
// //                   <td>{p.category}</td>
// //                   <td>{p.stock}</td>
// //                   <td>
// //                     <button onClick={() => handleEdit(p)}>Edit</button>
// //                     <button onClick={() => handleDelete(p._id)}>Delete</button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </>
// //       )}

// //       {activeTab === "orders" && (
// //         <>
// //           <h2>All Orders</h2>
// //           {orders.length === 0 ? (
// //             <p>No orders found.</p>
// //           ) : (
// //             orders.map(o => (
// //               <div key={o._id} className="order-card">
// //                 <h4>Order #{o._id.slice(-6)}</h4>
// //                 <p><strong>User:</strong> {o.user?.name}</p>
// //                 <p><strong>Total:</strong> ₹{o.totalPrice}</p>
// //                 <p><strong>Status:</strong> {o.paymentStatus || "Pending"}</p>
// //                 {o.orderItems.map((i, idx) => (
// //                   <p key={idx}>{i.name} × {i.qty} — ₹{i.price * i.qty}</p>
// //                 ))}
// //               </div>
// //             ))
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Admin;

// // // import React from 'react'

// // // const Admin = () => {
// // //   return (
// // //     <div>Admin</div>

// // //   )
// // // }

// // // export default Admin
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const Admin = () => {
// //   const [activeTab, setActiveTab] = useState("products");
// //   const [products, setProducts] = useState([]);
// //   const [orders, setOrders] = useState([]);
// //   const [form, setForm] = useState({
// //     name: "",
// //     price: "",
// //     description: "",
// //     category: "",
// //     stock: "",
// //     imageUrl: ""
// //   });
// //   const [editingId, setEditingId] = useState(null);
// //   const [file, setFile] = useState(null);

// //   /* ---------------- PRODUCTS ---------------- */

// //   const fetchProducts = async () => {
// //     const res = await axios.get("/api/products");
// //     setProducts(res.data);
// //   };

// //   useEffect(() => {
// //     if (activeTab === "products") fetchProducts();
// //     if (activeTab === "orders") fetchOrders();
// //   }, [activeTab]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (editingId) {
// //       await axios.put(`/api/products/${editingId}`, form);
// //     } else {
// //       await axios.post("/api/products", form);
// //     }

// //     setForm({ name:"", price:"", description:"", category:"", stock:"", imageUrl:"" });
// //     setEditingId(null);
// //     fetchProducts();
// //   };

// //   const handleEdit = (product) => {
// //     setForm(product);
// //     setEditingId(product._id);
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this product?")) {
// //       await axios.delete(`/api/products/${id}`);
// //       fetchProducts();
// //     }
// //   };

// //   /* ---------------- BULK UPLOAD ---------------- */

// //   const handleBulkUpload = async () => {
// //     if (!file) return alert("Please select a file");

// //     const formData = new FormData();
// //     formData.append("file", file);

// //     const res = await axios.post("/api/products/bulk-upload", formData);
// //     alert(res.data.message);
// //     fetchProducts();
// //   };

// //   /* ---------------- ORDERS ---------------- */

// //   const fetchOrders = async () => {
// //     const res = await axios.get("/api/orders");
// //     setOrders(res.data);
// //   };

// //   return (
// //     <div style={{ padding: 20 }}>
// //       <h1>Admin Panel</h1>

// //       {/* TABS */}
// //       <div style={{ marginBottom: 20 }}>
// //         <button onClick={() => setActiveTab("products")}>Products</button>
// //         <button onClick={() => setActiveTab("bulk")}>Bulk Upload</button>
// //         <button onClick={() => setActiveTab("orders")}>Orders</button>
// //       </div>

// //       {/* PRODUCT MANAGEMENT */}
// //       {activeTab === "products" && (
// //         <>
// //           <h2>Product Management</h2>

// //           {/* ADD / EDIT FORM */}
// //           <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
// //             {Object.keys(form).map((field) => (
// //               <input
// //                 key={field}
// //                 placeholder={field.toUpperCase()}
// //                 value={form[field]}
// //                 onChange={(e) => setForm({ ...form, [field]: e.target.value })}
// //                 style={{ display: "block", marginBottom: 10, width: "100%" }}
// //               />
// //             ))}
// //             <button type="submit">
// //               {editingId ? "Update Product" : "Add Product"}
// //             </button>
// //           </form>

// //           {/* PRODUCT TABLE */}
// //           <table border="1" width="100%" cellPadding="10">
// //             <thead>
// //               <tr>
// //                 <th>Name</th>
// //                 <th>Price</th>
// //                 <th>Category</th>
// //                 <th>Stock</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {products.map((p) => (
// //                 <tr key={p._id}>
// //                   <td>{p.name}</td>
// //                   <td>₹{p.price}</td>
// //                   <td>{p.category}</td>
// //                   <td>{p.stock}</td>
// //                   <td>
// //                     <button onClick={() => handleEdit(p)}>Edit</button>
// //                     <button onClick={() => handleDelete(p._id)}>Delete</button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </>
// //       )}

// //       {/* BULK UPLOAD */}
// //       {activeTab === "bulk" && (
// //         <>
// //           <h2>Bulk Upload Products</h2>

// //           <p>Accepted columns: name, price, description, category, stock, imageUrl</p>

// //           <input
// //             type="file"
// //             accept=".csv,.xlsx"
// //             onChange={(e) => setFile(e.target.files[0])}
// //           />

// //           <br /><br />
// //           <button onClick={handleBulkUpload}>Upload File</button>
// //         </>
// //       )}

// //       {/* ORDER MANAGEMENT */}
// //       {activeTab === "orders" && (
// //         <>
// //           <h2>Order Management</h2>

// //           {orders.map((order) => (
// //             <div
// //               key={order._id}
// //               style={{ border: "1px solid #ccc", padding: 15, marginBottom: 10 }}
// //             >
// //               <p><b>Customer:</b> {order.user?.name}</p>
// //               <p><b>Status:</b> {order.paymentStatus}</p>

// //               {order.items.map((item, i) => (
// //                 <p key={i}>
// //                   {item.name} × {item.qty}
// //                 </p>
// //               ))}
// //             </div>
// //           ))}
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Admin;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Admin.css";
// import { FALLBACK_IMAGE, handleImageError } from "../utils/fallbackImage";

// const Admin = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("products");
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category: "",
//     stock: "",
//     imageUrl: "",
//     imageData: ""
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [editingId, setEditingId] = useState(null);

//   // 🔹 Bulk upload states
//   const [file, setFile] = useState(null);
//   const [previewData, setPreviewData] = useState([]);

//   const token = localStorage.getItem("token");

//   const axiosAuth = axios.create({
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });

//   /* ---------------- PRODUCTS ---------------- */

//   const fetchProducts = async () => {
//     const res = await axios.get("http://localhost:5000/api/products");
//     setProducts(res.data);
//   };

//   const fetchOrders = async () => {
//     const res = await axiosAuth.get("http://localhost:5000/api/orders");
//     setOrders(res.data);
//   };

//   useEffect(() => {
//     if (activeTab === "products") fetchProducts();
//     if (activeTab === "orders") fetchOrders();
//   }, [activeTab]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         setImagePreview(base64String);
//         setForm({ ...form, imageData: base64String });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // const productData = {
//     //   ...form,
//     //   price: Number(form.price),
//     //   stock: Number(form.stock)
//     // };
// const productData = {
//   name: form.name,
//   price: Number(form.price),
//   description: form.description,
//   category: form.category,
//   stock: Number(form.stock),
//   image: form.imageData || form.imageUrl
// };

//     if (editingId) {
//       await axiosAuth.put(
//         `http://localhost:5000/api/products/${editingId}`,
//         productData
//       );
//     } else {
//       await axiosAuth.post(
//         "http://localhost:5000/api/products",
//         productData
//       );
//     }

//     setForm({
//       name: "",
//       price: "",
//       description: "",
//       category: "",
//       stock: "",
//       imageUrl: "",
//       imageData: ""
//     });
//     setImageFile(null);
//     setImagePreview(null);
//     setEditingId(null);
//     fetchProducts();
//   };

//   const handleEdit = (p) => {
//     setForm(p);
//     setEditingId(p._id);
//     if (p.imageData) {
//       setImagePreview(p.imageData);
//     } else if (p.image) {
//       setImagePreview(p.image);
//     } else {
//       setImagePreview(null);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this product?")) {
//       await axiosAuth.delete(
//         `http://localhost:5000/api/products/${id}`
//       );
//       fetchProducts();
//     }
//   };

//   /* ---------------- BULK UPLOAD ---------------- */

//   // STEP 1: Upload & Preview
//   const handlePreview = async () => {
//     if (!file) return alert("Select a file");

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await axiosAuth.post(
//       "http://localhost:5000/api/admin/products/bulk-preview",
//       formData
//     );

//     setPreviewData(res.data);
//   };

//   // STEP 2: Save to DB
//   const handleBulkSave = async () => {
//     if (previewData.length === 0) return;

//     const res = await axiosAuth.post(
//       "http://localhost:5000/api/admin/products/bulk-save",
//       previewData
//     );

//     alert("Bulk upload completed");
//     setPreviewData([]);
//     setFile(null);
//     fetchProducts();
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="admin-container">
//       <h1 className="admin-title">⚙️ Admin Dashboard</h1>

//       {/* TABS */}
//       <div className="admin-tabs">
//         <button 
//           className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
//           onClick={() => setActiveTab("products")}
//         >
//           Products
//         </button>
//         <button 
//           className={`tab-btn ${activeTab === "bulk" ? "active" : ""}`}
//           onClick={() => setActiveTab("bulk")}
//         >
//           Bulk Upload
//         </button>
//         <button 
//           className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
//           onClick={() => setActiveTab("orders")}
//         >
//           Orders
//         </button>
//         <button 
//           className="tab-btn create-admin-btn"
//           onClick={() => navigate("/admin/create-admin")}
//         >
//           👤 Create Admin
//         </button>
//       </div>

//       <div className="admin-content">

//       {/* PRODUCTS */}
//       {activeTab === "products" && (
//         <>
//           <h2 className="section-title">Product Management</h2>

//           <form className="product-form" onSubmit={handleSubmit}>
//             {Object.keys(form).map((f) => {
//               if (f === "imageData" || f === "imageUrl") return null;
//               return f === "description" ? (
//                 <textarea
//                   key={f}
//                   placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
//                   value={form[f]}
//                   onChange={(e) =>
//                     setForm({ ...form, [f]: e.target.value })
//                   }
//                 />
//               ) : (
//                 <input
//                   key={f}
//                   type={f === "price" || f === "stock" ? "number" : "text"}
//                   placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
//                   value={form[f]}
//                   onChange={(e) =>
//                     setForm({ ...form, [f]: e.target.value })
//                   }
//                   required={f !== "imageUrl"}
//                 />
//               );
//             })}
//             <div className="image-upload-section">
//               <label className="image-upload-label">
//                 Product Image
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="image-input"
//                 />
//               </label>
//               {/* <div className="image-preview">
//                 <img 
//                   src={imagePreview || FALLBACK_IMAGE} 
//                   alt="Preview" 
//                   onError={handleImageError}
//                 />
//                 {imagePreview && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setImagePreview(null);
//                       setImageFile(null);
//                       setForm({ ...form, imageData: "" });
//                     }}
//                     className="remove-image-btn"
//                   >
//                     Remove Image
//                   </button>
//                 )}
//               </div> */}
//             </div>
//             <div className="form-buttons">
//               {editingId && (
//                 <button 
//                   type="button" 
//                   className="btn-cancel"
//                   onClick={() => {
//                     setEditingId(null);
//                     setForm({
//                       name: "",
//                       price: "",
//                       description: "",
//                       category: "",
//                       stock: "",
//                       imageUrl: "",
//                       imageData: ""
//                     });
//                     setImagePreview(null);
//                     setImageFile(null);
//                   }}
//                 >
//                   Cancel
//                 </button>
//               )}
//               <button type="submit" className="btn-submit">
//                 {editingId ? "Update Product" : "Add Product"}
//               </button>
//             </div>
//           </form>

//           <table className="products-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Category</th>
//                 <th>Stock</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>
//                     No products found. Add your first product!
//                   </td>
//                 </tr>
//               ) : (
//                 products.map((p) => (
//                   <tr key={p._id}>
//                     <td>{p.name}</td>
//                     <td>₹{p.price}</td>
//                     <td>{p.category || "N/A"}</td>
//                     <td>{p.stock || 0}</td>
//                     <td>
//                       <div className="action-buttons">
//                         <button className="btn-edit" onClick={() => handleEdit(p)}>
//                           Edit
//                         </button>
//                         <button className="btn-delete" onClick={() => handleDelete(p._id)}>
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </>
//       )}

//       {/* BULK UPLOAD */}
//       {activeTab === "bulk" && (
//         <div className="bulk-upload-section">
//           <h2 className="section-title">Bulk Upload Products</h2>
//           <p style={{ color: "#7f8c8d", marginBottom: "20px" }}>
//             Upload a CSV or Excel file with columns: name, price, description, category, stock, imageUrl
//           </p>

//           <div className="file-input-wrapper">
//             <input
//               type="file"
//               accept=".csv,.xlsx"
//               onChange={(e) => setFile(e.target.files[0])}
//               className="file-input"
//             />
//           </div>

//           <button className="btn-primary" onClick={handlePreview} disabled={!file}>
//             Preview Data
//           </button>

//           {previewData.length > 0 && (
//             <>
//               <table className="preview-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Price</th>
//                     <th>Category</th>
//                     <th>Stock</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {previewData.map((p, i) => (
//                     <tr key={i}>
//                       <td>{p.name}</td>
//                       <td>₹{p.price}</td>
//                       <td>{p.category}</td>
//                       <td>{p.stock}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <button className="btn-submit" onClick={handleBulkSave} style={{ marginTop: "20px" }}>
//                 Upload {previewData.length} Products to Database
//               </button>
//             </>
//           )}
//         </div>
//       )}

//       {/* ORDERS */}
//       {activeTab === "orders" && (
//         <>
//           <h2 className="section-title">Order Management</h2>

//           {orders.length === 0 ? (
//             <div style={{ textAlign: "center", padding: "40px", color: "#7f8c8d" }}>
//               No orders yet.
//             </div>
//           ) : (
//             <div className="orders-list">
//               {orders.map((o) => (
//                 <div key={o._id} className="order-card">
//                   <h4>Order #{o._id.slice(-6)}</h4>
//                   <p><strong>User:</strong> {o.user?.name || "Unknown"}</p>
//                   <p><strong>Status:</strong> {o.paymentStatus || "Pending"}</p>
//                   <div style={{ marginTop: "15px" }}>
//                     <strong>Items:</strong>
//                     {o.items?.map((i, idx) => (
//                       <p key={idx} style={{ marginLeft: "20px" }}>
//                         {i.name} × {i.qty} - ₹{i.price * i.qty}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//       </div>
//     </div>
//   );
// };

// export default Admin;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Admin.css";
// import { FALLBACK_IMAGE, handleImageError } from "../utils/fallbackImage";
// import { Link, useNavigate, useLocation } from "react-router-dom";


// const Admin = () => {
//   const navigate = useNavigate();
//    const location = useLocation();
//   const [activeTab, setActiveTab] = useState("products");
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category: "",
//     stock: "",
//     imageUrl: "",
//     imageData: ""
//   });

//   const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
//   const [imagePreview, setImagePreview] = useState(null);
//   const [editingId, setEditingId] = useState(null);

//   const [file, setFile] = useState(null);
//   const [previewData, setPreviewData] = useState([]);

//   const token = localStorage.getItem("token");

//   const axiosAuth = axios.create({
//     headers: { Authorization: `Bearer ${token}` }
//   });

//   const fetchProducts = async () => {
//     const res = await axios.get("http://localhost:5000/api/products");
//     setProducts(res.data);
//   };

//   const fetchOrders = async () => {
//     const res = await axiosAuth.get("http://localhost:5000/api/orders");
//     setOrders(res.data);
//   };

//   useEffect(() => {
//     if (activeTab === "products") fetchProducts();
//     if (activeTab === "orders") fetchOrders();
//   }, [activeTab]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > MAX_IMAGE_SIZE) {
//       alert("Only images smaller than 5 MB allowed.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//       setForm(prev => ({ ...prev, imageData: reader.result }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const productData = {
//       name: form.name.trim(),
//       price: Number(form.price),
//       description: form.description,
//       category: form.category,
//       stock: Number(form.stock),
//       image: form.imageData || form.imageUrl
//     };

//     if (editingId) {
//       await axiosAuth.put(`http://localhost:5000/api/products/${editingId}`, productData);
//     } else {
//       await axiosAuth.post("http://localhost:5000/api/products", productData);
//     }

//     resetForm();
//     fetchProducts();
//   };

//   const resetForm = () => {
//     setForm({
//       name: "",
//       price: "",
//       description: "",
//       category: "",
//       stock: "",
//       imageUrl: "",
//       imageData: ""
//     });
//     setImagePreview(null);
//     setEditingId(null);
//   };

//   const handleEdit = (p) => {
//     setForm({
//       name: p.name,
//       price: p.price,
//       description: p.description,
//       category: p.category,
//       stock: p.stock,
//       imageUrl: "",
//       imageData: p.image
//     });
//     setImagePreview(p.image);
//     setEditingId(p._id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product?")) return;
//     await axiosAuth.delete(`http://localhost:5000/api/products/${id}`);
//     fetchProducts();
//   };

//   return (
//     <div className="admin-container">
//       <h1 className="admin-title">⚙️ Admin Dashboard</h1>

  
// <div className="admin-tabs">
//   <button
//     className={activeTab === "products" ? "active tab-btn" : "tab-btn"}
//     onClick={() => setActiveTab("products")}
//   >
//     Products
//   </button>

//   <button
//     className={activeTab === "bulk" ? "active tab-btn" : "tab-btn"}
//     onClick={() => setActiveTab("bulk")}
//   >
//     Bulk Upload
//   </button>

// {/* <button
//   className={location.pathname === "/products/bulk-upload" ? "active tab-btn" : "tab-btn"}
//   onClick={() => navigate("/products/bulk-upload")}
// >
//   Bulk Upload
// </button> */}

//   <Link
//     to="/my-orders"
//     className={location.pathname === "/my-orders" ? "active tab-btn" : "tab-btn"}
//   >
//     My Orders
//   </Link>

//   <button
//     className="tab-btn create-admin-btn"
//     onClick={() => navigate("/admin/create-admin")}
//   >
//     👤 Create Admin
//   </button>
// </div>

//       {activeTab === "products" && (
//         <>
//           <form className="product-form" onSubmit={handleSubmit}>
//             {["name", "price", "description", "category", "stock"].map(f =>
//               f === "description" ? (
//                 <textarea key={f} placeholder={f} value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} />
//               ) : (
//                 <input key={f} placeholder={f} value={form[f]} type={f === "price" || f === "stock" ? "number" : "text"} onChange={e => setForm({ ...form, [f]: e.target.value })} />
//               )
//             )}
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             <img src={imagePreview || FALLBACK_IMAGE} onError={handleImageError} alt="preview" />
//             <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
//             {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
//           </form>

//           <table className="products-table">
//             <tbody>
//               {products.map(p => (
//                 <tr key={p._id}>
//                   <td>{p.name}</td>
//                   <td>₹{p.price}</td>
//                   <td>{p.category}</td>
//                   <td>{p.stock}</td>
//                   <td>
//                     <button onClick={() => handleEdit(p)}>Edit</button>
//                     <button onClick={() => handleDelete(p._id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}

//       {activeTab === "orders" && (
//         <>
//           <h2>All Orders</h2>
//           {orders.length === 0 ? (
//             <p>No orders found.</p>
//           ) : (
//             orders.map(o => (
//               <div key={o._id} className="order-card">
//                 <h4>Order #{o._id.slice(-6)}</h4>
//                 <p><strong>User:</strong> {o.user?.name}</p>
//                 <p><strong>Total:</strong> ₹{o.totalPrice}</p>
//                 <p><strong>Status:</strong> {o.paymentStatus || "Pending"}</p>
//                 {o.orderItems.map((i, idx) => (
//                   <p key={idx}>{i.name} × {i.qty} — ₹{i.price * i.qty}</p>
//                 ))}
//               </div>
//             ))
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Admin;

// // import React from 'react'

// // const Admin = () => {
// //   return (
// //     <div>Admin</div>

// //   )
// // }

// // export default Admin
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Admin = () => {
//   const [activeTab, setActiveTab] = useState("products");
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category: "",
//     stock: "",
//     imageUrl: ""
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [file, setFile] = useState(null);

//   /* ---------------- PRODUCTS ---------------- */

//   const fetchProducts = async () => {
//     const res = await axios.get("/api/products");
//     setProducts(res.data);
//   };

//   useEffect(() => {
//     if (activeTab === "products") fetchProducts();
//     if (activeTab === "orders") fetchOrders();
//   }, [activeTab]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editingId) {
//       await axios.put(`/api/products/${editingId}`, form);
//     } else {
//       await axios.post("/api/products", form);
//     }

//     setForm({ name:"", price:"", description:"", category:"", stock:"", imageUrl:"" });
//     setEditingId(null);
//     fetchProducts();
//   };

//   const handleEdit = (product) => {
//     setForm(product);
//     setEditingId(product._id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       await axios.delete(`/api/products/${id}`);
//       fetchProducts();
//     }
//   };

//   /* ---------------- BULK UPLOAD ---------------- */

//   const handleBulkUpload = async () => {
//     if (!file) return alert("Please select a file");

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await axios.post("/api/products/bulk-upload", formData);
//     alert(res.data.message);
//     fetchProducts();
//   };

//   /* ---------------- ORDERS ---------------- */

//   const fetchOrders = async () => {
//     const res = await axios.get("/api/orders");
//     setOrders(res.data);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Admin Panel</h1>

//       {/* TABS */}
//       <div style={{ marginBottom: 20 }}>
//         <button onClick={() => setActiveTab("products")}>Products</button>
//         <button onClick={() => setActiveTab("bulk")}>Bulk Upload</button>
//         <button onClick={() => setActiveTab("orders")}>Orders</button>
//       </div>

//       {/* PRODUCT MANAGEMENT */}
//       {activeTab === "products" && (
//         <>
//           <h2>Product Management</h2>

//           {/* ADD / EDIT FORM */}
//           <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
//             {Object.keys(form).map((field) => (
//               <input
//                 key={field}
//                 placeholder={field.toUpperCase()}
//                 value={form[field]}
//                 onChange={(e) => setForm({ ...form, [field]: e.target.value })}
//                 style={{ display: "block", marginBottom: 10, width: "100%" }}
//               />
//             ))}
//             <button type="submit">
//               {editingId ? "Update Product" : "Add Product"}
//             </button>
//           </form>

//           {/* PRODUCT TABLE */}
//           <table border="1" width="100%" cellPadding="10">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Category</th>
//                 <th>Stock</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr key={p._id}>
//                   <td>{p.name}</td>
//                   <td>₹{p.price}</td>
//                   <td>{p.category}</td>
//                   <td>{p.stock}</td>
//                   <td>
//                     <button onClick={() => handleEdit(p)}>Edit</button>
//                     <button onClick={() => handleDelete(p._id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}

//       {/* BULK UPLOAD */}
//       {activeTab === "bulk" && (
//         <>
//           <h2>Bulk Upload Products</h2>

//           <p>Accepted columns: name, price, description, category, stock, imageUrl</p>

//           <input
//             type="file"
//             accept=".csv,.xlsx"
//             onChange={(e) => setFile(e.target.files[0])}
//           />

//           <br /><br />
//           <button onClick={handleBulkUpload}>Upload File</button>
//         </>
//       )}

//       {/* ORDER MANAGEMENT */}
//       {activeTab === "orders" && (
//         <>
//           <h2>Order Management</h2>

//           {orders.map((order) => (
//             <div
//               key={order._id}
//               style={{ border: "1px solid #ccc", padding: 15, marginBottom: 10 }}
//             >
//               <p><b>Customer:</b> {order.user?.name}</p>
//               <p><b>Status:</b> {order.paymentStatus}</p>

//               {order.items.map((item, i) => (
//                 <p key={i}>
//                   {item.name} × {item.qty}
//                 </p>
//               ))}
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default Admin;
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Admin.css";
import { FALLBACK_IMAGE, handleImageError } from "../utils/fallbackImage";
import ParticlesBackground from "./ParticlesBackground";

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

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // 🔹 Bulk upload states
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);

  const token = localStorage.getItem("token");

  const axiosAuth = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  /* ---------------- PRODUCTS ---------------- */

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
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setForm({ ...form, imageData: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const productData = {
    //   ...form,
    //   price: Number(form.price),
    //   stock: Number(form.stock)
    // };
const productData = {
  name: form.name,
  price: Number(form.price),
  description: form.description,
  category: form.category,
  stock: Number(form.stock),
  image: form.imageData || form.imageUrl
};

    if (editingId) {
      await axiosAuth.put(
        `http://localhost:5000/api/products/${editingId}`,
        productData
      );
    } else {
      await axiosAuth.post(
        "http://localhost:5000/api/products",
        productData
      );
    }

    setForm({
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "",
      imageUrl: "",
      imageData: ""
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p._id);
    if (p.imageData) {
      setImagePreview(p.imageData);
    } else if (p.image) {
      setImagePreview(p.image);
    } else {
      setImagePreview(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await axiosAuth.delete(
        `http://localhost:5000/api/products/${id}`
      );
      fetchProducts();
    }
  };

  /* ---------------- BULK UPLOAD ---------------- */

  // STEP 1: Upload & Preview
  const handlePreview = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosAuth.post(
      "http://localhost:5000/api/admin/products/bulk-preview",
      formData
    );

    setPreviewData(res.data);
  };

  // STEP 2: Save to DB
  const handleBulkSave = async () => {
    if (previewData.length === 0) return;

    const res = await axiosAuth.post(
      "http://localhost:5000/api/admin/products/bulk-save",
      previewData
    );

    alert("Bulk upload completed");
    setPreviewData([]);
    setFile(null);
    fetchProducts();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="admin-wrapper">
    {/* 🔹 Particles Background */}
    <ParticlesBackground />

    <div className="admin-container">
      <h1 className="admin-title">⚙️ Admin Dashboard</h1>

      {/* TABS */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button 
          className={`tab-btn ${activeTab === "bulk" ? "active" : ""}`}
          onClick={() => setActiveTab("bulk")}
        >
          Bulk Upload
        </button>
        {/* <button 
          className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button> */}
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

      <div className="admin-content">

      {/* PRODUCTS */}
      {activeTab === "products" && (
        <>
          <h2 className="section-title">Product Management</h2>

          <form className="product-form" onSubmit={handleSubmit}>
            {Object.keys(form).map((f) => {
              if (f === "imageData" || f === "imageUrl") return null;
              return f === "description" ? (
                <textarea
                  key={f}
                  placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                  value={form[f]}
                  onChange={(e) =>
                    setForm({ ...form, [f]: e.target.value })
                  }
                />
              ) : (
                <input
                  key={f}
                  type={f === "price" || f === "stock" ? "number" : "text"}
                  placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                  value={form[f]}
                  onChange={(e) =>
                    setForm({ ...form, [f]: e.target.value })
                  }
                  required={f !== "imageUrl"}
                />
              );
            })}
            <div className="image-upload-section">
              <label className="image-upload-label">
                Product Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-input"
                />
              </label>
              <div className="image-preview">
                <img 
                  src={imagePreview || FALLBACK_IMAGE} 
                  alt="Preview" 
                  onError={handleImageError}
                />
                {/* {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                      setForm({ ...form, imageData: "" });
                    }}
                    className="remove-image-btn"
                  >
                    Remove Image
                  </button>
                )} */}
              </div>
            </div>
            
            <div className="form-buttons">
              {editingId && (
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => {
                    setEditingId(null);
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
                    setImageFile(null);
                  }}
                >
                  Cancel
                </button>
              )}
              <button type="submit" className="btn-submit">
                {editingId ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>

          <table className="products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>
                    No products found. Add your first product!
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>₹{p.price}</td>
                    <td>{p.category || "N/A"}</td>
                    <td>{p.stock || 0}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-edit" onClick={() => handleEdit(p)}>
                          Edit
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(p._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}

      {/* BULK UPLOAD */}
      {activeTab === "bulk" && (
        <div className="bulk-upload-section">
          <h2 className="section-title">Bulk Upload Products</h2>
          <p style={{ color: "#7f8c8d", marginBottom: "20px" }}>
            Upload a CSV or Excel file with columns: name, price, description, category, stock, imageUrl
          </p>

          <div className="file-input-wrapper">
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={(e) => setFile(e.target.files[0])}
              className="file-input"
            />
          </div>

          <button className="btn-primary" onClick={handlePreview} disabled={!file}>
            Preview Data
          </button>

          {previewData.length > 0 && (
            <>
              <table className="preview-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((p, i) => (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>₹{p.price}</td>
                      <td>{p.category}</td>
                      <td>{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="btn-submit" onClick={handleBulkSave} style={{ marginTop: "20px" }}>
                Upload {previewData.length} Products to Database
              </button>
            </>
          )}
        </div>
      )}

      {/* ORDERS */}
      {activeTab === "orders" && (
        <>
          <h2 className="section-title">Order Management</h2>

          {orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#7f8c8d" }}>
              No orders yet.
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((o) => (
                <div key={o._id} className="order-card">
                  <h4>Order #{o._id.slice(-6)}</h4>
                  <p><strong>User:</strong> {o.user?.name || "Unknown"}</p>
                  <p><strong>Status:</strong> {o.paymentStatus || "Pending"}</p>
                  <div style={{ marginTop: "15px" }}>
                    <strong>Items:</strong>
                    {o.items?.map((i, idx) => (
                      <p key={idx} style={{ marginLeft: "20px" }}>
                        {i.name} × {i.qty} - ₹{i.price * i.qty}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      </div>
    </div>
    </div>
  );
};

export default Admin;