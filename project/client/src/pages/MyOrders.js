import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <h4>Order #{order._id.slice(-6)}</h4>
          <p>Total: ₹{order.totalPrice}</p>
          {order.orderItems.map((item, i) => (
            <p key={i}>
              {item.name} × {item.qty} — ₹{item.price}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
