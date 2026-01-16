
import React, { useEffect, useState } from "react";
import "./MyOrders.css";
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("You must be logged in to view orders.");

        const res = await fetch("http://localhost:5000/api/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unable to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (orders.length === 0) return <p>You have no orders yet.</p>;

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h4>Order #{order._id.slice(-6)}</h4>
          <p>Total: ₹{order.totalPrice}</p>
          {order.orderItems.map((item, i) => (
            <div key={i}>
              <p>
                {item.name} × {item.qty} — ₹{item.price}
              </p>
              <p>Category: {item.category}</p>
            </div>
          ))}
          <p>Shipping: {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.zip}</p>
          <p>Status: {order.paymentStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;

