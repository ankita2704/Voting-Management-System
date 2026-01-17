import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    email: "",
    address: "",
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

    try {
      const res = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };
return (
  <div className="register-wrapper">
    <div className="register-card">

      <div className="left-text">
        WELCOME,<br />
        Enter Your Details<br />
        and Start Voting.
      </div>

      <form onSubmit={handleSubmit}>
        <img src="main logo.jpg" className="logo" alt="logo" />

        <h2>Create Your account</h2>

        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
        <input name="email" type="email" placeholder="E-mail" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input
          name="aadharCardNumber"
          placeholder="Aadhar Card Number"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

    </div>
  </div>
);
}

export default Register;
