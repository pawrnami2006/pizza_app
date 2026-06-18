import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import "./VerifyEmail.css";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState(
    "Verifying email..."
  );

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      await axios.get(
        `http://localhost:5000/api/auth/verify-email/${token}`
      );

      setMessage(
        "Email verified successfully! Redirecting to Login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Verification failed"
      );
    }
  };

  return (
    <div className="verify-page">

      <div className="verify-content">

        <h1 className="verify-title">
          EMAIL
          <br />
          VERIFIED
        </h1>

        <p className="verify-subtitle">
          Almost there...
        </p>

        <div className="verify-card">

          <img
            src={logo}
            alt="PizzaHub"
            className="verify-logo"
          />

          <h2>Email Verification</h2>

          <p className="verify-message">
            {message}
          </p>

        </div>

      </div>

    </div>
  );
}

export default VerifyEmail;