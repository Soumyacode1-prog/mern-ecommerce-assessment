
// // import React, { useEffect, useState } from "react";
// // import "./Products.css";
// // import { useNavigate } from "react-router-dom";
// // import { isLoggedIn } from "../utils/auth";
// // import { getImageSrc, handleImageError } from "../utils/fallbackImage";
// // import { sanitizeProductForCart } from "../utils/cartUtils";

// // const Products = () => {
// //   const [products, setProducts] = useState([]);
// //   const [heroBg, setHeroBg] = useState(""); // 👈 hero background
// //   const navigate = useNavigate();

// //   const handleAddToCart = (product) => {
// //     if (!isLoggedIn()) {
// //       alert("Please login first");
// //       navigate("/login");
// //       return;
// //     }

// //     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
// //     const index = cart.findIndex((i) => i._id === product._id);

// //     if (index !== -1) cart[index].qty += 1;
// //     else cart.push(sanitizeProductForCart({ ...product, qty: 1 }));

// //     localStorage.setItem("cart", JSON.stringify(cart));
// //     navigate("/orders");
// //   };

// //   useEffect(() => {
// //     fetch("http://localhost:5000/api/products")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setProducts(data);

// //         // 🔥 FIND LIVING ROOM PRODUCT
// //         const livingRoomProduct = data.find(
// //           (p) =>
// //             p.name?.toLowerCase() === "living room" ||
// //             p.category?.toLowerCase() === "living room"
// //         );

// //         if (livingRoomProduct) {
// //           setHeroBg(getImageSrc(livingRoomProduct));
// //         }
// //       });
// //   }, []);

// //   return (
// //     <>
// //       {/* HERO */}
// //       <section
// //         className="store-hero"
// //         style={{
// //           backgroundImage: heroBg ? `url(${heroBg})` : "none",
// //         }}
// //       >
// //         <h1>Living Room Collection</h1>
// //         <p>Elegant designs crafted for comfort & style</p>
// //       </section>

// //       {/* PRODUCTS */}
// //       {/* <section className="store-section">
// //         <h2 className="section-title">Our Products</h2>

// //         <div className="store-grid">
// //           {products.map((product) => (
// //             <div className="store-card" key={product._id}>
// //               <img
// //                 src={getImageSrc(product)}
// //                 onError={handleImageError}
// //                 alt={product.name}
// //               />

// //               <div className="store-card-body">
// //                 <h3>{product.name}</h3>
// //                 <p className="store-desc">
// //                   {product.description || "Premium quality product"}
// //                 </p>
// //                 <p className="store-price">₹{product.price}</p>

// //                 <button onClick={() => handleAddToCart(product)}>
// //                   Add to Cart →
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section> */}
// //       {/* PROMO MARQUEE */}
// // <section className="promo-marquee">
// //   <div className="promo-track">
// //     <span>🔥 SALE 10% DISCOUNT</span>
// //     <span>🛍️ BUY NOW</span>
// //     <span>⏰ LIMITED TIME OFFER</span>
// //     <span>🔥 SALE 10% DISCOUNT</span>
// //     <span>🛍️ BUY NOW</span>
// //     <span>⏰ LIMITED TIME OFFER</span>
// //   </div>
// // </section>

// //       <section className="store-section">
// //   <h2 className="section-title">Our Products</h2>
// //   <p className="section-subtitle">
// //     Premium collections crafted for modern living
// //   </p>

// //   <div className="practice-grid">
// //     {products.map((product) => (
// //       <div className="practice-card" key={product._id}>
// //         {/* IMAGE */}
// //         <div className="practice-image">
// //           <img
// //             src={getImageSrc(product)}
// //             onError={handleImageError}
// //             alt={product.name}
// //           />
// //         </div>

// //         {/* ICON */}
// //         <div className="practice-icon">🛋️</div>

// //         {/* CONTENT */}
// //         <div className="practice-content">
// //           <h3>{product.name}</h3>

// //           <p>
// //             {product.description ||
// //               "Thoughtfully designed décor to elevate your living space."}
// //           </p>

// //           <span
// //             className="practice-link"
// //             onClick={() => handleAddToCart(product)}
// //           >
// //             Add to Cart →
// //           </span>
// //         </div>
// //       </div>
// //     ))}
// //   </div>
// // </section>

// //     </>
// //   );
// // };

// // export default Products;
// // import React, { useEffect, useState } from "react";
// // import "./Products.css";
// // import { useNavigate } from "react-router-dom";
// // import { isLoggedIn } from "../utils/auth";
// // import { getImageSrc, handleImageError } from "../utils/fallbackImage";
// // import { sanitizeProductForCart } from "../utils/cartUtils";

// // const Products = () => {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleAddToCart = (product) => {
// //     if (!isLoggedIn()) {
// //       alert("Please login first to add products to cart");
// //       navigate("/login");
// //       return;
// //     }

// //     try {
     
// //       const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      
  
// //       const existingIndex = cart.findIndex(item => item._id === product._id);
      
// //       if (existingIndex !== -1) {
       
// //         cart[existingIndex].qty = (cart[existingIndex].qty || 1) + 1;
// //       } else {
        
// //         const sanitizedProduct = sanitizeProductForCart({ ...product, qty: 1 });
// //         cart.push(sanitizedProduct);
// //       }
      
    
// //       localStorage.setItem("cart", JSON.stringify(cart));
      
  
// //       alert(`${product.name} added to cart!`);
// //       navigate("/orders");
// //     } catch (error) {
// //       if (error.name === 'QuotaExceededError') {
// //         alert("Cart is full! Please remove some items or checkout.");
// //       } else {
// //         alert("Failed to add item to cart. Please try again.");
// //         console.error("Cart error:", error);
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     async function fetchProducts() {
// //       try {
// //         const res = await fetch("http://localhost:5000/api/products");
// //         if (!res.ok) throw new Error("Failed to fetch");
// //         const data = await res.json();
// //         setProducts(data);
// //       } catch (err) {
// //         setError("Unable to load products");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchProducts();
// //   }, []);

// //   if (loading) return <h2 className="center">Loading...</h2>;
// //   if (error) return <h2 className="center">{error}</h2>;

// //   return (
// //     <div className="products-container">
    
// //       <section className="hero-section">
// //         <div className="hero-content">
// //           <div className="hero-text">
// //             <h1 className="hero-title">Welcome to Our Store</h1>
// //             <p className="hero-subtitle">Discover amazing products at unbeatable prices</p>
// //             <p className="hero-description">
// //               Shop the latest trends and find everything you need in one place. 
// //               Quality products, fast delivery, and exceptional service.
// //             </p>
// //             <div className="hero-buttons">
// //               <button 
// //                 className="hero-btn primary" 
// //                 onClick={() => {
// //                   const productsSection = document.querySelector('.products-section');
// //                   productsSection?.scrollIntoView({ behavior: 'smooth' });
// //                 }}
// //               >
// //                 Shop Now
// //               </button>
// //               <button 
// //                 className="hero-btn secondary"
// //                 onClick={() => navigate("/my-orders")}
// //               >
// //                 View Cart
// //               </button>
// //             </div>
// //           </div>
       
// //         </div>
// //         <div className="hero-features">
// //           <div className="feature-item">
// //             <span className="feature-icon">🚚</span>
// //             <span className="feature-text">Free Shipping</span>
// //           </div>
// //           <div className="feature-item">
// //             <span className="feature-icon">💳</span>
// //             <span className="feature-text">Secure Payment</span>
// //           </div>
// //           <div className="feature-item">
// //             <span className="feature-icon">↩️</span>
// //             <span className="feature-text">Easy Returns</span>
// //           </div>
// //           <div className="feature-item">
// //             <span className="feature-icon">⭐</span>
// //             <span className="feature-text">Quality Products</span>
// //           </div>
// //         </div>
// //       </section>

   
// //       <section className="products-section">
// //         <h2 className="products-title">🛍️ Our Products</h2>

// //         <div className="products-grid">
// //         {products.length === 0 ? (
// //           <div className="center">No products available</div>
// //         ) : (
// //           products.map((product) => (
// //             <div className="product-card" key={product._id}>
// //               <img 
// //                 src={getImageSrc(product)} 
// //                 alt={product.name}
// //                 onError={handleImageError}
// //               />
// //               <h3>{product.name}</h3>
// //               <p className="price">₹{product.price}</p>
// //               <p className="desc">{product.description || "No description available"}</p>
// //               {product.category && (
// //                 <p className="category">Category: {product.category}</p>
// //               )}
// //               <button onClick={() => handleAddToCart(product)}>
// //                 🛒 Add to Cart
// //               </button>
// //             </div>
// //           ))
// //         )}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Products;
// import React, { useEffect, useState } from "react";
// import "./Products.css";
// import { useNavigate } from "react-router-dom";
// import { isLoggedIn } from "../utils/auth";
// import { getImageSrc, handleImageError } from "../utils/fallbackImage";
// import { sanitizeProductForCart } from "../utils/cartUtils";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   const handleAddToCart = (product) => {
//     if (!isLoggedIn()) {
//       alert("Please login first");
//       navigate("/login");
//       return;
//     }

//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const index = cart.findIndex((i) => i._id === product._id);

//     if (index !== -1) {
//       cart[index].qty += 1;
//     } else {
//       cart.push(sanitizeProductForCart({ ...product, qty: 1 }));
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert("Added to cart");
//     navigate("/my-orders");
//   };

//   useEffect(() => {
//     fetch("http://localhost:5000/api/products")
//       .then((res) => res.json())
//       .then(setProducts);
//   }, []);

//   return (
//     <>
//       {/* HERO */}
//       <section className="store-hero">
//         <h1>Discover Quality Products</h1>
//         <p>Carefully curated items designed for everyday excellence</p>
//       </section>

//       {/* PRODUCTS */}
//       <section className="store-section">
//         <h2 className="section-title">Our Products</h2>

//         <div className="store-grid">
//           {products.map((product) => (
//             <div className="store-card" key={product._id}>
//               <img
//                 src={getImageSrc(product)}
//                 onError={handleImageError}
//                 alt={product.name}
//               />

//               <div className="store-card-body">
//                 <h3>{product.name}</h3>
//                 <p className="store-desc">
//                   {product.description || "Premium quality product"}
//                 </p>
//                 <p className="store-price">₹{product.price}</p>

//                 <button onClick={() => handleAddToCart(product)}>
//                   Add to Cart →
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Products;

import React, { useEffect, useState } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { getImageSrc, handleImageError } from "../utils/fallbackImage";
import { sanitizeProductForCart } from "../utils/cartUtils";
import ParticlesBackground from "./ParticlesBackground";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
const [heroImage, setHeroImage] = useState("");
const ITEMS_PER_PAGE = 3;
const [currentIndex, setCurrentIndex] = useState(0);

const handleNext = () => {
  if (currentIndex + ITEMS_PER_PAGE < products.length) {
    setCurrentIndex(currentIndex + ITEMS_PER_PAGE);
  }
};

const handlePrev = () => {
  if (currentIndex - ITEMS_PER_PAGE >= 0) {
    setCurrentIndex(currentIndex - ITEMS_PER_PAGE);
  }
};

  const handleAddToCart = (product) => {
    if (!isLoggedIn()) {
      alert("Please login first to add products to cart");
      navigate("/login");
      return;
    }

    try {
     
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      
  
      const existingIndex = cart.findIndex(item => item._id === product._id);
      
      if (existingIndex !== -1) {
       
        cart[existingIndex].qty = (cart[existingIndex].qty || 1) + 1;
      } else {
        
        const sanitizedProduct = sanitizeProductForCart({ ...product, qty: 1 });
        cart.push(sanitizedProduct);
      }
      
    
      localStorage.setItem("cart", JSON.stringify(cart));
      
  
      alert(`${product.name} added to cart!`);
      navigate("/orders");
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        alert("Cart is full! Please remove some items or checkout.");
      } else {
        alert("Failed to add item to cart. Please try again.");
        console.error("Cart error:", error);
      }
    }
  };

  // useEffect(() => {
  //   async function fetchProducts() {
  //     try {
  //       const res = await fetch("http://localhost:5000/api/products");
  //       if (!res.ok) throw new Error("Failed to fetch");
  //       const data = await res.json();
  //       setProducts(data);
  //     } catch (err) {
  //       setError("Unable to load products");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchProducts();
  // }, []);
useEffect(() => {
  async function fetchProducts() {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setProducts(data);

      // 🔥 FIND FLOWERS PRODUCT
      const flowersProduct = data.find(
        (p) => p.name?.toLowerCase() === "flowers"
      );

      if (flowersProduct) {
        setHeroImage(getImageSrc(flowersProduct));
      }
    } catch (err) {
      setError("Unable to load products");
    } finally {
      setLoading(false);
    }
  }

  fetchProducts();
}, []);

  if (loading) return <h2 className="center">Loading...</h2>;
  if (error) return <h2 className="center">{error}</h2>;

  return (
    <div className="products-container">
    
      {/* <section className="hero-section"> */}
      <section
  className="hero-section"
  style={{
    backgroundImage: heroImage ? `url(${heroImage})` : "none",
  }}
>
  <div className="particles-wrapper">
    <ParticlesBackground />
  </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Welcome to Our Store</h1>
            <p className="hero-subtitle">Discover amazing products at unbeatable prices</p>
            <p className="hero-description">
              Shop the latest trends and find everything you need in one place. 
              Quality products, fast delivery, and exceptional service.
            </p>
            <div className="hero-buttons">
              <button 
                className="hero-btn primary" 
                onClick={() => {
                  const productsSection = document.querySelector('.products-section');
                  productsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Shop Now
              </button>
              <button 
                className="hero-btn secondary"
                onClick={() => navigate("/my-orders")}
              >
                View Cart
              </button>
            </div>
          </div>
       
        </div>
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">🚚</span>
            <span className="feature-text">Free Shipping</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💳</span>
            <span className="feature-text">Secure Payment</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">↩️</span>
            <span className="feature-text">Easy Returns</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⭐</span>
            <span className="feature-text">Quality Products</span>
          </div>
        </div>
      </section>

   {/* <div className="particles-wrapper">
    <ParticlesBackground />
  </div> */}
      {/* <section className="products-section">
        <h2 className="products-title">🛍️ Our Products</h2>

        <div className="products-grid">
        {products.length === 0 ? (
          <div className="center">No products available</div>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <img 
                src={getImageSrc(product)} 
                alt={product.name}
                onError={handleImageError}
              />
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p className="desc">{product.description || "No description available"}</p>
              {product.category && (
                <p className="category">Category: {product.category}</p>
              )}
              <button onClick={() => handleAddToCart(product)}>
                🛒 Add to Cart
              </button>
            </div>
          ))
        )}
        </div>
      </section> */}
      <section className="products-section">
  <h2 className="products-title">🛍️ Our Products</h2>
 
  {products.length === 0 ? (
    <div className="center">No products available</div>
  ) : (
    <>
      <div className="products-grid">
        {products
          .slice(currentIndex, currentIndex + ITEMS_PER_PAGE)
          .map((product) => (
            <div className="product-card" key={product._id}>
              <img
                src={getImageSrc(product)}
                alt={product.name}
                onError={handleImageError}
              />

              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p className="desc">
                {product.description || "No description available"}
              </p>

              {product.category && (
                <p className="category">Category: {product.category}</p>
              )}

              <button onClick={() => handleAddToCart(product)}>
                🛒 Add to Cart
              </button>
            </div>
          ))}
      </div>

      {/* ⬅️➡️ PAGINATION BUTTONS */}
      <div className="pagination-controls">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          ⬅ Prev
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex + ITEMS_PER_PAGE >= products.length}
        >
          Next ➡
        </button>
      </div>
    </>
  )}
</section>

    </div>
  );
};

export default Products;