
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload(); 
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🛍️ Shop</Link>

      <div className="navbar-links">
        <Link to="/">Products</Link>

        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/admin">Admin Dashboard</Link>
            )}
            <Link to="/orders">My Orders</Link>
            <span className="navbar-user">👤 {user.name}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login / Register</Link>
        )}
      </div>
    </nav>
  );
}
