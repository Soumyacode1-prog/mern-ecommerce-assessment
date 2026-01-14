
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Auth() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true); 
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isSignup
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const body = isSignup
        ? form
        : { email: form.email, password: form.password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Auth failed");

     
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role || "customer"
      }));

   
      if (isSignup) {
        alert("Registration successful! Please login.");
        setIsSignup(false);
        setForm({ name: "", email: "", password: "" });
      } else {
       
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <div className="auth-tabs">
          <button onClick={() => setIsSignup(true)} className={isSignup ? "active" : ""}>
            Sign up
          </button>
          <button onClick={() => setIsSignup(false)} className={!isSignup ? "active" : ""}>
            Sign in
          </button>
        </div>

        <h2>{isSignup ? "Create an account" : "Welcome back"}</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <input 
              name="name" 
              placeholder="Name" 
              value={form.name}
              onChange={handleChange} 
              required 
            />
          )}

          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            value={form.email}
            onChange={handleChange} 
            required 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            value={form.password}
            onChange={handleChange} 
            required 
          />

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

