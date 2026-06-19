import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
        "https://pizzahub-backend-xgxj.onrender.com/api/auth/register",
        formData
      );

      setMessage(
        "Registration successful! Verification email sent."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="register-page">

      <div className="register-content">

        <h1 className="register-title">
          JOIN
          <br />
          PIZZAHUB
        </h1>

        <p className="register-subtitle">
          Start Your Pizza Journey.
        </p>

        <div className="register-card">

          <img
            src={logo}
            alt="PizzaHub"
            className="register-logo"
          />

          <h2>Create Account</h2>

          <p>Register to continue</p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

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
              className="register-btn"
            >
              Register
            </button>

          </form>

          <div className="register-links">

            Already have an account?{" "}

            <a href="/login">
              Login
            </a>

          </div>

          <p className="register-message">
            {message}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;