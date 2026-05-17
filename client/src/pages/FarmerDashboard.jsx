// client/src/pages/FarmerDashboard.jsx

import {
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import "../pages/styles.css";

function FarmerDashboard() {

  const navigate =
    useNavigate();

  const userId =
    localStorage.getItem(
      "userId"
    );

  const [
    user,
    setUser,
  ] = useState({});

  // =====================================
  // LOAD PROFILE
  // =====================================
  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      try {

        const res =
          await axios.get(
            `https://agroconnect-app-ksc5.onrender.com/api/profile/${userId}`
          );

        setUser(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  return (
    <div
      style={{
        display: "flex",
      }}
    >

      {/* =====================================
          SIDEBAR
      ===================================== */}
      <Sidebar />

      {/* =====================================
          MAIN CONTENT
      ===================================== */}
      <div
        style={{
          marginLeft:
            "250px",

          width:
            "100%",

          minHeight:
            "100vh",

          background:
            "#f5f7fb",

          padding:
            "35px 30px",
        }}
      >

        {/* =====================================
            HEADER
        ===================================== */}
        <div
          style={{
            display:
              "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            marginBottom:
              "35px",
          }}
        >

          {/* LEFT */}
          <div>

            <h1
              style={{
                fontSize:
                  "48px",

                marginBottom:
                  "10px",
              }}
            >
              Farmer Dashboard
            </h1>

            <p
              style={{
                color:
                  "#666",

                fontSize:
                  "18px",
              }}
            >
              Welcome back 👋
            </p>

          </div>

          {/* RIGHT PROFILE */}
          <div
            onClick={() =>
              navigate(
                "/profile"
              )
            }

            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap: "14px",

              cursor:
                "pointer",

              background:
                "white",

              padding:
                "12px 18px",

              borderRadius:
                "18px",

              boxShadow:
                "0 5px 18px rgba(0,0,0,0.06)",
            }}
          >

            <img
              src={
                user.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }

              alt="profile"

              style={{
                width:
                  "55px",

                height:
                  "55px",

                borderRadius:
                  "50%",

                objectFit:
                  "cover",

                border:
                  "3px solid #16a34a",
              }}
            />

            <div>

              <p
                style={{
                  fontSize:
                    "14px",

                  color:
                    "#666",

                  marginBottom:
                    "4px",
                }}
              >
                Logged in as
              </p>

              <h3
                style={{
                  margin: 0,
                }}
              >
                {
                  user.name ||
                  "Farmer"
                }
              </h3>

            </div>

          </div>

        </div>

        {/* =====================================
            QUICK ACTIONS
        ===================================== */}
        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",

            gap: "24px",
          }}
        >

          {/* CARD */}
          <div
            onClick={() =>
              navigate(
                "/add-product"
              )
            }

            style={
              cardStyle
            }
          >

            <div
              style={
                iconStyle
              }
            >
              🌾
            </div>

            <h2>
              Add Products
            </h2>

            <p>
              Upload your farm products for companies
            </p>

          </div>

          {/* CARD */}
          <div
            onClick={() =>
              navigate(
                "/farmer-orders"
              )
            }

            style={
              cardStyle
            }
          >

            <div
              style={
                iconStyle
              }
            >
              📦
            </div>

            <h2>
              Orders
            </h2>

            <p>
              Manage incoming company orders
            </p>

          </div>

          {/* CARD */}
          <div
            onClick={() =>
              navigate(
                "/chat"
              )
            }

            style={
              cardStyle
            }
          >

            <div
              style={
                iconStyle
              }
            >
              💬
            </div>

            <h2>
              Chat
            </h2>

            <p>
              Chat directly with companies
            </p>

          </div>

          {/* CARD */}
          <div
            onClick={() =>
              navigate(
                "/notifications"
              )
            }

            style={
              cardStyle
            }
          >

            <div
              style={
                iconStyle
              }
            >
              🔔
            </div>

            <h2>
              Notifications
            </h2>

            <p>
              View all latest updates
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

// =====================================
// CARD STYLE
// =====================================

const cardStyle = {
  background:
    "white",

  borderRadius:
    "24px",

  padding:
    "30px",

  cursor:
    "pointer",

  boxShadow:
    "0 8px 24px rgba(0,0,0,0.06)",

  transition:
    "0.3s",
};

const iconStyle = {
  width:
    "70px",

  height:
    "70px",

  borderRadius:
    "18px",

  background:
    "#dcfce7",

  display:
    "flex",

  alignItems:
    "center",

  justifyContent:
    "center",

  fontSize:
    "34px",

  marginBottom:
    "18px",
};

export default FarmerDashboard;