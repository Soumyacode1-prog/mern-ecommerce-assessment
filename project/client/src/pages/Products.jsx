
import React, { useEffect, useState } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { getImageSrc, handleImageError } from "../utils/fallbackImage";
import { sanitizeProductForCart } from "../utils/cartUtils";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data);
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
    
      <section className="hero-section">
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
                onClick={() => navigate("/orders")}
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

   
      <section className="products-section">
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
      </section>
    </div>
  );
};

export default Products;
