import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const { token } = useParams();

  const [message, setMessage] = useState(
    "Verifying email..."
  );

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/verify-email/${token}`
      );

      setMessage(res.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Verification failed"
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
}

export default VerifyEmail;