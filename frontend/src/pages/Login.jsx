import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    aadharCardNumber: "",
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

    console.log("Sending login data:", formData); 

    try {
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", res.status); 

      const data = await res.json();
      console.log("Response data:", data); 

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert("Login successful");

      
      if (data.role === "admin") {
        navigate("/admin/manage");
      } else {
        navigate("/vote");
      }

    } catch (err) {
      console.error("LOGIN FETCH ERROR:", err);
      alert("Backend not reachable. Is server running?");
    }
  };

  return (
  <div className="login-wrapper">
    <div className="login-card">

      <div className="left-text">
        WELCOME,<br />
        Fill 
        Your Details.<br />
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <img src="main logo.jpg" alt="logo" className="logo" />

        <h2 className="login-title">Log in</h2>

        <input type="text" name="aadharCardNumber" placeholder="Aadhar Card Number" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />

        <button type="submit" className="submit-btn">Submit</button>
      </form>

    </div>
  </div>
);


}

export default Login;
