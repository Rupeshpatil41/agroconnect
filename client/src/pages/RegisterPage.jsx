// client/src/pages/RegisterPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/styles.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/register", form);
      alert("Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account</h2>
        <p>Join AgroConnect today</p>

        <select name="role" onChange={handleChange}>
          <option value="farmer">Farmer</option>
          <option value="company">Company</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Create password"
          onChange={handleChange}
        />

        <button className="primary full" onClick={handleSubmit}>
          Register
        </button>

        <p className="switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;