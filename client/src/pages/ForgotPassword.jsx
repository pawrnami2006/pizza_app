import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      setMessage(res.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="forgot-page">

      <div className="forgot-content">

        <h1 className="forgot-title">
          RESET
          <br />
          PASSWORD
        </h1>

        <p className="forgot-subtitle">
          We'll send a reset link.
        </p>

        <div className="forgot-card">

          <img
            src={logo}
            alt="PizzaHub"
            className="forgot-logo"
          />

          <h2>Forgot Password</h2>

          <p>
            Enter your email address
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <button
              type="submit"
              className="forgot-btn"
            >
              Send Reset Link
            </button>

          </form>

          <p className="forgot-message">
            {message}
          </p>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;