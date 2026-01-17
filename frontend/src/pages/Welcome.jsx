import { useNavigate } from "react-router-dom";
import "../styles/welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-wrapper">
      <div className="welcome-card">

        {/* LEFT SECTION */}
        <div className="welcome-left">
          <div className="welcome-text">
            <h1>WELCOME,</h1>
            <p>Elections belong to the people.</p>
            <p>It’s your decision.</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="welcome-right">

          {/* LOGO */}
          <img
            src="main logo.jpg"
            alt="Voting App Logo"
            className="main-logo"
          />
          <div className="title">
            <h1>Voting App</h1>
            </div>

          {/* REGISTER BUTTON */}
          <button
            className="action-btn"
            onClick={() => navigate("/register")}
          >
            <img
              src="register logo.jpg"
              alt="Register"
              className="btn-icon"
            />
            Register
          </button>

          {/* LOGIN BUTTON */}
          <button
            className="action-btn"
            onClick={() => navigate("/login")}
          >
            <img
              src="login logo.png"
              alt="Login"
              className="btn-icon"
            />
            Login
          </button>

        </div>
      </div>
    </div>
  );
}

export default Welcome;
