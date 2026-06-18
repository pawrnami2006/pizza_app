import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
import "./ResetPassword.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Reset failed"
      );
    }
  };

  return (
    <div className="reset-page">

      <div className="reset-content">

        <h1 className="reset-title">
          NEW
          <br />
          PASSWORD
        </h1>

        <p className="reset-subtitle">
          Secure your account.
        </p>

        <div className="reset-card">

          <img
            src={logo}
            alt="PizzaHub"
            className="reset-logo"
          />

          <h2>Reset Password</h2>

          <p>
            Enter your new password
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="submit"
              className="reset-btn"
            >
              Reset Password
            </button>

          </form>

          <p className="reset-message">
            {message}
          </p>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;