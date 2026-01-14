import { useState } from "react";
import API from "../api/api";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    countInStock: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/products", form);
    alert("Product added");
  };

  return (
    <form onSubmit={submit} className="form">
      <h2>Add Product</h2>

      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Price" onChange={e => setForm({ ...form, price: e.target.value })} />
      <input placeholder="Stock" onChange={e => setForm({ ...form, countInStock: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />

      <button>Add</button>
    </form>
  );
}
