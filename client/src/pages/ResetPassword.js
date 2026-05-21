import { useState } from "react";
import axios from "axios";
import { FaLock } from "react-icons/fa";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams(); // Get the token from the URL
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `https://password-reset-0lzq.onrender.com/api/auth/reset-password/${token}`,
        { password },
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-card">
        <div className="text-center">
          <div className="reset-password-icon">
            <FaLock />
          </div>

          <h2 className="reset-password-heading">Reset Password</h2>

          <p className="reset-password-subtext">Enter your new password</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="reset-password-input"
            placeholder="Enter New Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="reset-password-button">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
