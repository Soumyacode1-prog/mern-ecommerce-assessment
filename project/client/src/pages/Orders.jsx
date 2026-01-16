// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./Orders.css";
// // import { getImageSrc, handleImageError, FALLBACK_IMAGE } from "../utils/fallbackImage";
// // import { getCartItemImage } from "../utils/cartUtils";

// // const Orders = () => {
// //   const navigate = useNavigate();
// //   const [cart, setCart] = useState([]);
// //   const [step, setStep] = useState("cart");
// //   const [address, setAddress] = useState({
// //     name: "",
// //     phone: "",
// //     street: "",
// //     city: "",
// //     zip: ""
// //   });

// //   useEffect(() => {
// //     try {
// //       const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

// //       const cleanedCart = savedCart.map(item => ({
// //         _id: item._id,
// //         name: item.name,
// //         price: item.price,
// //         description: item.description,
// //         category: item.category,
// //         stock: item.stock,
// //         imageUrl: item.imageUrl || null,
// //         qty: item.qty || 1
     
// //       }));
// //       setCart(cleanedCart);

// //       if (JSON.stringify(savedCart) !== JSON.stringify(cleanedCart)) {
// //         localStorage.setItem("cart", JSON.stringify(cleanedCart));
// //       }
// //     } catch (error) {
// //       console.error("Error loading cart:", error);
     
// //       localStorage.removeItem("cart");
// //       setCart([]);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (cart.length > 0) {
// //       try {
   
// //         const sanitizedCart = cart.map(item => ({
// //           _id: item._id,
// //           name: item.name,
// //           price: item.price,
// //           description: item.description,
// //           category: item.category,
// //           stock: item.stock,
// //           imageUrl: item.imageUrl || null,
// //           qty: item.qty || 1
// //         }));
// //         localStorage.setItem("cart", JSON.stringify(sanitizedCart));
// //       } catch (error) {
// //         if (error.name === 'QuotaExceededError') {
// //           alert("Cart storage limit reached. Please checkout or remove items.");
// //         }
// //       }
// //     }
// //   }, [cart]);

// //   const increaseQty = (index) => {
// //     const updated = cart.map((item, i) =>
// //       i === index ? { ...item, qty: (item.qty || 1) + 1 } : item
// //     );
// //     setCart(updated);
// //   };

// //   const decreaseQty = (index) => {
// //     const updated = cart
// //       .map((item, i) =>
// //         i === index ? { ...item, qty: Math.max(1, (item.qty || 1) - 1) } : item
// //       )
// //       .filter(item => item.qty > 0);
// //     setCart(updated);
// //   };

// //   const removeItem = (index) => {
// //     const updated = cart.filter((_, i) => i !== index);
// //     setCart(updated);
// //   };

// //   const total = cart.reduce(
// //     (sum, item) => sum + (item.price || 0) * (item.qty || 1),
// //     0
// //   );
// // const confirmOrder = async () => {
// //   try {
// //     const token = localStorage.getItem("token");

// //     const orderData = {
// //       orderItems: cart.map(item => ({
// //         product: item._id,
// //         name: item.name,
// //         price: item.price,
// //         image: item.imageUrl,
// //         description: item.description,
// //         category: item.category,
// //         qty: item.qty,
// //       })),
// //       shippingAddress: address,
// //       totalPrice: total,
// //     };

// //     await fetch("http://localhost:5000/api/orders", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify(orderData),
// //     });

// //     localStorage.removeItem("cart");
// //     setCart([]);
// //     setStep("confirmed");
// //   } catch (err) {
// //     console.error(err);
// //     alert("Failed to place order");
// //   }
// // };

// //   if (cart.length === 0 && step !== "confirmed") {
// //     return (
// //       <div className="orders-container">
// //         <div className="empty-cart">
// //           <h2>🛒 Your cart is empty</h2>
// //           <p>Add some products to get started!</p>
// //           <button className="btn-primary" onClick={() => navigate("/")}>
// //             Continue Shopping
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="orders-container">
// //       <h1 className="orders-title">🛒 Shopping Cart</h1>

// //       {step === "cart" && (
// //         <div className="cart-step">
// //           <div className="cart-items">
// //             {cart.map((item, i) => (
// //               <div key={item._id || i} className="cart-item">
// //                 <img
// //                   src={item.imageUrl || FALLBACK_IMAGE}
// //                   alt={item.name}
// //                   className="cart-item-image"
// //                   onError={handleImageError}
// //                 />
// //                 <div className="cart-item-details">
// //                   <h3>{item.name}</h3>
// //                   <p className="cart-item-price">₹{item.price}</p>
// //                   {item.description && <p className="cart-item-desc">{item.description}</p>}
// //                 </div>
// //                 <div className="cart-item-controls">
// //                   <div className="quantity-controls">
// //                     <button onClick={() => decreaseQty(i)} className="qty-btn">-</button>
// //                     <span className="qty-value">{item.qty || 1}</span>
// //                     <button onClick={() => increaseQty(i)} className="qty-btn">+</button>
// //                   </div>
// //                   <button onClick={() => removeItem(i)} className="remove-btn">
// //                     Remove
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="cart-summary">
// //             <div className="total-section">
// //               <h3>Total: ₹{total.toFixed(2)}</h3>
// //             </div>
// //             <button className="btn-primary checkout-btn" onClick={() => setStep("checkout")}>
// //               Proceed to Checkout
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {step === "checkout" && (
// //         <div className="checkout-step">
// //           <h2>Shipping Address</h2>
// //           <form className="address-form">
// //             {Object.keys(address).map((field) => (
// //               <input
// //                 key={field}
// //                 type={field === "phone" ? "tel" : field === "zip" ? "number" : "text"}
// //                 placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
// //                 value={address[field]}
// //                 onChange={(e) =>
// //                   setAddress({ ...address, [field]: e.target.value })
// //                 }
// //                 required
// //                 className="address-input"
// //               />
// //             ))}
// //             <div className="checkout-buttons">
// //               <button type="button" className="btn-secondary" onClick={() => setStep("cart")}>
// //                 Back to Cart
// //               </button>
// //               <button type="button" className="btn-primary" onClick={() => setStep("review")}>
// //                 Review Order
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       )}

// //       {step === "review" && (
// //         <div className="review-step">
// //           <h2>Review Your Order</h2>
// //           <div className="review-section">
// //             <div className="review-address">
// //               <h3>Shipping Address</h3>
// //               <p><strong>Name:</strong> {address.name}</p>
// //               <p><strong>Phone:</strong> {address.phone}</p>
// //               <p><strong>Address:</strong> {address.street}, {address.city} - {address.zip}</p>
// //             </div>
// //             <div className="review-items">
// //               <h3>Order Items</h3>
// //               {cart.map((item, i) => (
// //                 <div key={i} className="review-item">
// //                   <span>{item.name} × {item.qty || 1}</span>
// //                   <span>₹{(item.price * (item.qty || 1)).toFixed(2)}</span>
// //                 </div>
// //               ))}
// //             </div>
// //             <div className="review-total">
// //               <h3>Total: ₹{total.toFixed(2)}</h3>
// //             </div>
// //           </div>
// //           <div className="review-buttons">
// //             <button className="btn-secondary" onClick={() => setStep("checkout")}>
// //               Back
// //             </button>
       
// //             <button className="btn-primary" onClick={confirmOrder}>
// //   Confirm Order
// // </button>

// //           </div>
// //         </div>
// //       )}

// //       {step === "confirmed" && (
// //         <div className="confirmed-step">
// //           <div className="success-icon">✅</div>
// //           <h2>Order Confirmed! 🎉</h2>
// //           <p>Your order has been placed successfully.</p>
// //           <p>You will receive a confirmation email shortly.</p>
// //           <button className="btn-primary" onClick={() => navigate("/")}>
// //             Continue Shopping
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Orders;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Orders.css";
// import { getImageSrc, handleImageError, FALLBACK_IMAGE } from "../utils/fallbackImage";
// import { getCartItemImage } from "../utils/cartUtils";

// const Orders = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [step, setStep] = useState("cart");
//   const [address, setAddress] = useState({
//     name: "",
//     phone: "",
//     street: "",
//     city: "",
//     zip: ""
//   });

//   useEffect(() => {
//     try {
//       const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

//       const cleanedCart = savedCart.map(item => ({
//         _id: item._id,
//         name: item.name,
//         price: item.price,
//         description: item.description,
//         category: item.category,
//         stock: item.stock,
//         imageUrl: item.imageUrl || null,
//         qty: item.qty || 1
     
//       }));
//       setCart(cleanedCart);

//       if (JSON.stringify(savedCart) !== JSON.stringify(cleanedCart)) {
//         localStorage.setItem("cart", JSON.stringify(cleanedCart));
//       }
//     } catch (error) {
//       console.error("Error loading cart:", error);
     
//       localStorage.removeItem("cart");
//       setCart([]);
//     }
//   }, []);

//   useEffect(() => {
//     if (cart.length > 0) {
//       try {
   
//         const sanitizedCart = cart.map(item => ({
//           _id: item._id,
//           name: item.name,
//           price: item.price,
//           description: item.description,
//           category: item.category,
//           stock: item.stock,
//           imageUrl: item.imageUrl || null,
//           qty: item.qty || 1
//         }));
//         localStorage.setItem("cart", JSON.stringify(sanitizedCart));
//       } catch (error) {
//         if (error.name === 'QuotaExceededError') {
//           alert("Cart storage limit reached. Please checkout or remove items.");
//         }
//       }
//     }
//   }, [cart]);

//   const increaseQty = (index) => {
//     const updated = cart.map((item, i) =>
//       i === index ? { ...item, qty: (item.qty || 1) + 1 } : item
//     );
//     setCart(updated);
//   };

//   const decreaseQty = (index) => {
//     const updated = cart
//       .map((item, i) =>
//         i === index ? { ...item, qty: Math.max(1, (item.qty || 1) - 1) } : item
//       )
//       .filter(item => item.qty > 0);
//     setCart(updated);
//   };

//   const removeItem = (index) => {
//     const updated = cart.filter((_, i) => i !== index);
//     setCart(updated);
//   };

//   const total = cart.reduce(
//     (sum, item) => sum + (item.price || 0) * (item.qty || 1),
//     0
//   );
// const confirmOrder = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const orderData = {
//       orderItems: cart.map(item => ({
//         product: item._id,
//         name: item.name,
//         price: item.price,
//         image: item.imageUrl,
//         description: item.description,
//         category: item.category,
//         qty: item.qty,
//       })),
//       shippingAddress: address,
//       totalPrice: total,
//     };

//     await fetch("http://localhost:5000/api/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(orderData),
//     });

//     localStorage.removeItem("cart");
//     setCart([]);
//     setStep("confirmed");
//   } catch (err) {
//     console.error(err);
//     alert("Failed to place order");
//   }
// };

//   if (cart.length === 0 && step !== "confirmed") {
//     return (
//       <div className="orders-container">
//         <div className="empty-cart">
//           <h2>🛒 Your cart is empty</h2>
//           <p>Add some products to get started!</p>
//           <button className="btn-primary" onClick={() => navigate("/")}>
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="orders-container">
//       <h1 className="orders-title">🛒 Shopping Cart</h1>

//       {step === "cart" && (
//         <div className="cart-step">
//           <div className="cart-items">
//             {cart.map((item, i) => (
//               <div key={item._id || i} className="cart-item">
//                 <img
//                   src={item.imageUrl || FALLBACK_IMAGE}
//                   alt={item.name}
//                   className="cart-item-image"
//                   onError={handleImageError}
//                 />
//                 <div className="cart-item-details">
//                   <h3>{item.name}</h3>
//                   <p className="cart-item-price">₹{item.price}</p>
//                   {item.description && <p className="cart-item-desc">{item.description}</p>}
//                 </div>
//                 <div className="cart-item-controls">
//                   <div className="quantity-controls">
//                     <button onClick={() => decreaseQty(i)} className="qty-btn">-</button>
//                     <span className="qty-value">{item.qty || 1}</span>
//                     <button onClick={() => increaseQty(i)} className="qty-btn">+</button>
//                   </div>
//                   <button onClick={() => removeItem(i)} className="remove-btn">
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="cart-summary">
//             <div className="total-section">
//               <h3>Total: ₹{total.toFixed(2)}</h3>
//             </div>
//             <button className="btn-primary checkout-btn" onClick={() => setStep("checkout")}>
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}

//       {step === "checkout" && (
//         <div className="checkout-step">
//           <h2>Shipping Address</h2>
//           <form className="address-form">
//             {Object.keys(address).map((field) => (
//               <input
//                 key={field}
//                 type={field === "phone" ? "tel" : field === "zip" ? "number" : "text"}
//                 placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                 value={address[field]}
//                 onChange={(e) =>
//                   setAddress({ ...address, [field]: e.target.value })
//                 }
//                 required
//                 className="address-input"
//               />
//             ))}
//             <div className="checkout-buttons">
//               <button type="button" className="btn-secondary" onClick={() => setStep("cart")}>
//                 Back to Cart
//               </button>
//               <button type="button" className="btn-primary" onClick={() => setStep("review")}>
//                 Review Order
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {step === "review" && (
//         <div className="review-step">
//           <h2>Review Your Order</h2>
//           <div className="review-section">
//             <div className="review-address">
//               <h3>Shipping Address</h3>
//               <p><strong>Name:</strong> {address.name}</p>
//               <p><strong>Phone:</strong> {address.phone}</p>
//               <p><strong>Address:</strong> {address.street}, {address.city} - {address.zip}</p>
//             </div>
//             <div className="review-items">
//               <h3>Order Items</h3>
//               {cart.map((item, i) => (
//                 <div key={i} className="review-item">
//                   <span>{item.name} × {item.qty || 1}</span>
//                   <span>₹{(item.price * (item.qty || 1)).toFixed(2)}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="review-total">
//               <h3>Total: ₹{total.toFixed(2)}</h3>
//             </div>
//           </div>
//           <div className="review-buttons">
//             <button className="btn-secondary" onClick={() => setStep("checkout")}>
//               Back
//             </button>
       
//             <button className="btn-primary" onClick={confirmOrder}>
//   Confirm Order
// </button>

//           </div>
//         </div>
//       )}

//       {step === "confirmed" && (
//         <div className="confirmed-step">
//           <div className="success-icon">✅</div>
//           <h2>Order Confirmed! 🎉</h2>
//           <p>Your order has been placed successfully.</p>
//           <p>You will receive a confirmation email shortly.</p>
//           <button className="btn-primary" onClick={() => navigate("/")}>
//             Continue Shopping
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;
