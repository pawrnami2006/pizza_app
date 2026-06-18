import { useState } from "react";
import axios from "axios";

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
    <div style={{ padding: "20px" }}>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Send Reset Link
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;