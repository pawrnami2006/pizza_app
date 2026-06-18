import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
  <div className="login-page">

    <div className="left-section">

      <h1 className="hero-title">
        BUILD YOUR
        <br />
        PERFECT PIZZA
      </h1>

      <p className="hero-subtitle">
        One Slice At A Time.
      </p>

      <div className="login-card">

        <img
          src={logo}
          alt="PizzaHub"
          className="logo"
        />

        <h2>Welcome Back</h2>

        <p>Sign in to PizzaHub</p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <div className="links">

          <a href="/forgot-password">
            Forgot Password?
          </a>

          <br />
          <br />

          Don't have an account?{" "}

          <a href="/register">
            Register
          </a>

        </div>

        <p className="message">
          {message}
        </p>

      </div>

    </div>

  </div>
);
}

export default Login;