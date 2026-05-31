import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaEnvelopeOpenText, FaShieldAlt } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="home-page">
      <div className="home-card">
        <div className="home-header">
          <div className="home-icon">
            <FaHome />
          </div>
          <div>
            <h1 className="home-title">Welcome Back</h1>
            <p className="home-subtext">
              You are successfully logged in. Manage your account from here.
            </p>
          </div>
        </div>

        <div className="home-welcome-box">
          <div>
            <h2>What you can do next</h2>
            <p>
              Reset your password, review security, or logout when you are done.
            </p>
          </div>
          <div className="home-stat">
            <span>Secure access</span>
            <FaShieldAlt />
          </div>
        </div>

        <div className="home-grid">
          <div className="home-card-item">
            <div className="item-icon">
              <FaEnvelopeOpenText />
            </div>
            <h3>Password Reset</h3>
            <p>Send a reset link to your email immediately.</p>
          </div>

          <div className="home-card-item">
            <div className="item-icon">
              <FaShieldAlt />
            </div>
            <h3>Account Security</h3>
            <p>Keep your account safe with a strong password.</p>
          </div>
        </div>

        <div className="home-actions">
          <Link to="/forgot-password" className="home-button home-button-secondary">
            Reset Password
          </Link>
          <button onClick={handleLogout} className="home-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
