import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
        "https://userauthorization.onrender.com/api/auth/login",
        JSON.stringify(formData),
      );

      console.log(res.data);

      alert("Login Successful");

      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <div className="text-center">
          <div className="forgot-password-icon">
            <FaLock />
          </div>

          <h2 className="forgot-password-heading">Login</h2>

          <p className="forgot-password-subtext">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="forgot-password-input"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="forgot-password-input"
            required
            onChange={handleChange}
          />

          <button className="forgot-password-button">
            Login
          </button>
        </form>

        <div style={{ marginTop: "15px" }}>
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </div>

        <div style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;