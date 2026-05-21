import "./App.css";

import { Link, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <nav style={{ marginBottom: "20px", display: "flex", gap: "15px" }}>
        <Link to="forgot-password" style={{ marginRight: "10px" }}>
          ForgotPassword
        </Link>

        <Link to="/reset-password/:token" style={{ marginRight: "10px" }}>
          ResetPassword
        </Link>
      </nav>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
