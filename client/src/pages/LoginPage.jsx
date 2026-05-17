import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../pages/styles.css";

function LoginPage() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  // =====================================
  // HANDLE INPUT
  // =====================================
  const handleChange = (
    e
  ) => {

    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  // =====================================
  // LOGIN
  // =====================================
  const handleLogin =
    async () => {

      try {

        const res =
          await axios.post(
            "https://agroconnect-app-ksc5.onrender.com/api/login",

            form
          );

        console.log(
          "LOGIN RESPONSE:",
          res.data
        );

        // USER OBJECT
        const user =
          res.data;

        // SAVE USER
        localStorage.setItem(
          "user",

          JSON.stringify(
            user
          )
        );

        localStorage.setItem(
          "role",
          user.role
        );

        localStorage.setItem(
          "userId",
          user._id
        );

        alert(
          "Login Successful"
        );

        // REDIRECT
        if (
          user.role ===
          "farmer"
        ) {

          navigate(
            "/farmer-dashboard"
          );

        } else {

          navigate(
            "/company-dashboard"
          );
        }

      } catch (err) {

        console.log(err);

        alert(
          err.response?.data
            ?.message ||
            "Login Failed"
        );
      }
    };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>
          Welcome Back!
        </h2>

        <p>
          Login to your account
        </p>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"

          value={form.email}

          onChange={
            handleChange
          }
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"

          value={
            form.password
          }

          onChange={
            handleChange
          }
        />

        <button
          className="primary full"

          onClick={
            handleLogin
          }
        >
          Login
        </button>

        <p className="switch">

          Don’t have an
          account?{" "}

          <span
            onClick={() =>
              navigate(
                "/register"
              )
            }
          >
            Register here
          </span>

        </p>

      </div>

    </div>
  );
}

export default LoginPage;