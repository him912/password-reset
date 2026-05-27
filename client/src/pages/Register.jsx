import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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
        "https://userauthorization.onrender.com/api/auth/register",
        formData
      );

      console.log(res.data);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <div className="text-center">
          <div className="forgot-password-icon">
            <FaUserPlus />
          </div>

          <h2 className="forgot-password-heading">Register</h2>

          <p className="forgot-password-subtext">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            className="forgot-password-input"
            required
            onChange={handleChange}
          />

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
            Register
          </button>
        </form>

        <div style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;