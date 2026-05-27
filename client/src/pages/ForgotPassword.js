import { useState } from "react";
import axios from "axios";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://password-reset-0lzq.onrender.com/api/auth/forgot-password",
        { email }
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <div className="text-center">
          <div className="forgot-password-icon">
            <FaEnvelope />
          </div>

          <h2 className="forgot-password-heading">
            Forgot Password?
          </h2>

          <p className="forgot-password-subtext">
            Enter your registered email
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="forgot-password-input"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="forgot-password-button">
            Send Reset Link
          </button>
        </form>

        <div
          style={{
            marginTop: "18px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to="/">
            Login
          </Link>

          <Link to="/register">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;