// // // import { Link, useNavigate } from "react-router-dom";
// // // import "./Navbar.css";

// // // export default function Navbar() {
// // //   const userStr = localStorage.getItem("user");
// // //   const user = userStr ? JSON.parse(userStr) : null;
// // //   const navigate = useNavigate();

// // //   const logout = () => {
// // //     localStorage.clear();
// // //     navigate("/login");
// // //     window.location.reload();
// // //   };

// // //   return (
// // //     <header className="navbar-wrapper">
// // //       <nav className="navbar-container">
// // //         {/* LEFT: Logo */}
// // //         <Link to="/" className="navbar-logo">
// // //           🛍️ Shop
// // //         </Link>

// // //         {/* CENTER: ALL NAV LINKS */}
// // //         <div className="navbar-center">
// // //           <Link to="/">Products</Link>

// // //           {user && user.role === "admin" && (
// // //             <Link to="/admin">Admin Dashboard</Link>
// // //           )}

// // //           {user && <Link to="/my-orders">Orders</Link>}

// // //           {!user && <Link to="/login">Login / Register</Link>}
// // //         </div>

// // //         {/* RIGHT: USER + CTA */}
// // //         <div className="navbar-right">
// // //           {user && (
// // //             <>
// // //               <span className="navbar-user">👤 {user.name}</span>
// // //               <button className="navbar-btn primary" onClick={logout}>
// // //                 Logout
// // //               </button>
// // //             </>
// // //           )}
// // //         </div>
// // //       </nav>
// // //     </header>
// // //   );
// // // }
// // import { Link, useNavigate } from "react-router-dom";
// // import "./Navbar.css";

// // export default function Navbar() {
// //   const userStr = localStorage.getItem("user");
// //   const user = userStr ? JSON.parse(userStr) : null;
// //   const navigate = useNavigate();

// //   const logout = () => {
// //     localStorage.clear();
// //     navigate("/login");
// //     window.location.reload();
// //   };

// //   return (
// //     <header className="navbar-wrapper">
// //       <nav className="navbar-container">
// //         {/* LOGO */}
// //         <Link to="/" className="navbar-logo">
// //           🛍️ Shop
// //         </Link>

// //         {/* LINKS */}
// //         <div className="navbar-center">
// //           <Link to="/">Products</Link>
// //           {user?.role === "admin" && <Link to="/admin">Admin</Link>}
// //           {user && <Link to="/my-orders">Orders</Link>}
// //           {!user && <Link to="/login">Login</Link>}
// //         </div>

// //         {/* USER */}
// //         <div className="navbar-right">
// //           {user && (
// //             <>
// //               <span className="navbar-user">👤 {user.name}</span>
// //               <button className="navbar-btn primary" onClick={logout}>
// //                 Logout
// //               </button>
// //             </>
// //           )}
// //         </div>
// //       </nav>
// //     </header>
// //   );
// // }
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./Navbar.css";

// export default function Navbar() {
//   const userStr = localStorage.getItem("user");
//   const user = userStr ? JSON.parse(userStr) : null;
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//     window.location.reload();
//   };

//   return (
//     <header className="navbar-wrapper">
//       <nav className="navbar-container">
//         {/* LOGO */}
//         <Link to="/" className="navbar-logo">
//           🛍️ Shop
//         </Link>

//         {/* HAMBURGER */}
//         <button
//           className="navbar-hamburger"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           ☰
//         </button>

//         {/* LINKS */}
//         <div className={`navbar-center ${menuOpen ? "open" : ""}`}>
//           <Link to="/" onClick={() => setMenuOpen(false)}>Products</Link>
//           {user?.role === "admin" && (
//             <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
//           )}
//           {user && (
//             <Link to="/my-orders" onClick={() => setMenuOpen(false)}>Orders</Link>
//           )}
//           {!user && (
//             <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
//           )}
//         </div>

//         {/* USER */}
//         {user && (
//           <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
//             <span className="navbar-user">👤 {user.name}</span>
//             <button className="navbar-btn primary" onClick={logout}>
//               Logout
//             </button>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar-container">
        {/* DESKTOP LOGO */}
        <Link to="/" className="navbar-logo desktop-only">
          🛍️ Shop
        </Link>

        {/* HAMBURGER (MOBILE ONLY) */}
        <button
          className="navbar-hamburger mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* MENU (DESKTOP + MOBILE DROPDOWN) */}
        <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          {/* <Link to="/" onClick={() => setMenuOpen(false)}>🛍️ Shop</Link> */}
          <Link to="/" onClick={() => setMenuOpen(false)}>Products</Link>

          {user?.role === "admin" && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
          )}

          {user && (
            <Link to="/my-orders" onClick={() => setMenuOpen(false)}>Orders</Link>
          )}

          {user ? (
            <>
              <span className="navbar-user">👤 {user.name}</span>
              <button className="navbar-btn primary" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
