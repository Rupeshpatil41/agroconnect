// client/src/pages/PublicProfile.jsx

import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import "../pages/styles.css";

function PublicProfile() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] =
    useState({});

  const [products, setProducts] =
    useState([]);

  const [reviews, setReviews] =
    useState([]);

  const [averageRating, setAverageRating] =
    useState(0);

  // =====================================
  // LOAD DATA
  // =====================================
  useEffect(() => {
    fetchProfile();
    fetchProducts();
    fetchReviews();
  }, []);

  // =====================================
  // PROFILE
  // =====================================
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `https://agroconnect-1-hyi3.onrender.com/api/profile/${id}`
      );

      setUser(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // =====================================
  // PRODUCTS
  // =====================================
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://agroconnect-1-hyi3.onrender.com/api/products"
      );

      const filtered =
        res.data.filter(
          (p) => p.farmerId === id
        );

      setProducts(filtered);

    } catch (err) {
      console.log(err);
    }
  };

  // =====================================
  // REVIEWS
  // =====================================
  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `https://agroconnect-1-hyi3.onrender.com/api/reviews/${id}`
      );

      setReviews(res.data);

      if (res.data.length > 0) {
        const total =
          res.data.reduce(
            (sum, r) =>
              sum + r.rating,
            0
          );

        setAverageRating(
          (
            total /
            res.data.length
          ).toFixed(1)
        );
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(to right, #f0fdf4, #f8fafc)",

        padding: "30px",
      }}
    >

      {/* =====================================
          BANNER
      ===================================== */}
      <div
        style={{
          height: "320px",

          borderRadius: "30px",

          background:
            "linear-gradient(135deg, #16a34a, #22c55e)",

          position: "relative",

          overflow: "hidden",

          marginBottom: "110px",

          boxShadow:
            "0 12px 30px rgba(0,0,0,0.1)",
        }}
      >

        {/* PATTERN */}
        <div
          style={{
            position: "absolute",

            width: "500px",
            height: "500px",

            borderRadius: "50%",

            background:
              "rgba(255,255,255,0.08)",

            top: "-200px",
            right: "-120px",
          }}
        />

        {/* PROFILE IMAGE */}
        <div
          style={{
            position: "absolute",

            bottom: "-85px",

            left: "50px",
          }}
        >

          <img
            src={
              user.image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt=""
            style={{
              width: "180px",

              height: "180px",

              borderRadius: "50%",

              objectFit: "cover",

              border:
                "6px solid white",

              background: "white",

              boxShadow:
                "0 8px 20px rgba(0,0,0,0.15)",
            }}
          />

        </div>

      </div>

      {/* =====================================
          MAIN PROFILE CARD
      ===================================== */}
      <div
        style={{
          background: "white",

          borderRadius: "30px",

          padding: "40px",

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",

          marginBottom: "30px",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            marginLeft: "210px",

            marginBottom: "35px",

            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            flexWrap: "wrap",

            gap: "20px",
          }}
        >

          <div>
            <h1
              style={{
                fontSize: "42px",

                marginBottom: "10px",
              }}
            >
              {user.role === "company"
                ? user.companyName ||
                  user.name
                : user.name}
            </h1>

            <p
              style={{
                color: "#666",

                fontSize: "18px",

                marginBottom: "12px",
              }}
            >
              {user.role === "company"
                ? "🏢 Verified Company"
                : "🌾 Trusted Farmer"}
            </p>

            {/* RATING */}
            <div
              style={{
                display: "flex",

                alignItems: "center",

                gap: "12px",
              }}
            >

              <div
                style={{
                  background:
                    "#fef9c3",

                  padding:
                    "10px 18px",

                  borderRadius:
                    "14px",

                  fontWeight: "600",

                  fontSize: "18px",
                }}
              >
                ⭐ {averageRating}
              </div>

              <p
                style={{
                  color: "#666",
                }}
              >
                {reviews.length} Reviews
              </p>

            </div>
          </div>

          {/* ACTIONS */}
          <div
            style={{
              display: "flex",

              gap: "15px",
            }}
          >

            <button
              onClick={() =>
                navigate("/chat")
              }
              style={{
                background:
                  "linear-gradient(to right, #16a34a, #22c55e)",

                color: "white",

                border: "none",

                padding:
                  "14px 28px",

                borderRadius:
                  "14px",

                fontSize: "16px",

                fontWeight: "600",

                cursor: "pointer",
              }}
            >
              💬 Chat
            </button>

          </div>

        </div>

        {/* INFO GRID */}
        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",

            gap: "20px",
          }}
        >

          <div className="stat-card">
            <h3>📧 Email</h3>
            <p>{user.email || "N/A"}</p>
          </div>

          <div className="stat-card">
            <h3>📞 Phone</h3>
            <p>{user.phone || "N/A"}</p>
          </div>

          <div className="stat-card">
            <h3>📍 Address</h3>
            <p>{user.address || "N/A"}</p>
          </div>

          {user.role === "farmer" && (
            <div className="stat-card">
              <h3>🌾 Farm Type</h3>

              <p>
                {user.farmType ||
                  "N/A"}
              </p>
            </div>
          )}

          {user.role === "company" && (
            <div className="stat-card">
              <h3>🌐 Website</h3>

              <p>
                {user.website ||
                  "N/A"}
              </p>
            </div>
          )}

        </div>

        {/* ABOUT */}
        <div
          className="stat-card"
          style={{
            marginTop: "25px",
          }}
        >

          <h2
            style={{
              marginBottom: "15px",
            }}
          >
            About
          </h2>

          <p
            style={{
              color: "#555",

              lineHeight: "1.9",

              fontSize: "16px",
            }}
          >
            {user.bio ||
              "No description added yet."}
          </p>

        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",

            gap: "20px",

            marginTop: "25px",
          }}
        >

          <div className="stat-card">
            <h1>
              {products.length}
            </h1>

            <p>Products</p>
          </div>

          <div className="stat-card">
            <h1>
              ⭐ {averageRating}
            </h1>

            <p>Rating</p>
          </div>

          <div className="stat-card">
            <h1>
              {reviews.length}
            </h1>

            <p>Reviews</p>
          </div>

        </div>

      </div>

      {/* =====================================
          PRODUCTS
      ===================================== */}
      {user.role === "farmer" && (
        <>
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            🌾 Farmer Products
          </h2>

          <div className="stats">
            {products.map((p) => (
              <div
                className="stat-card"
                key={p._id}

                style={{
                  width: "320px",
                }}
              >

                <img
                  src={p.image}
                  alt=""
                  style={{
                    width: "100%",

                    height: "220px",

                    objectFit: "cover",

                    borderRadius: "16px",
                  }}
                />

                <h3
                  style={{
                    marginTop: "15px",
                  }}
                >
                  {p.title}
                </h3>

                <p>₹{p.price}</p>

                <p>
                  Qty: {p.quantity}
                </p>

              </div>
            ))}
          </div>
        </>
      )}

      {/* =====================================
          REVIEWS
      ===================================== */}
      <div
        style={{
          marginTop: "40px",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          ⭐ Reviews
        </h2>

        <div
          style={{
            display: "flex",

            flexDirection: "column",

            gap: "20px",
          }}
        >

          {reviews.length === 0 ? (
            <div
              className="stat-card"
            >
              No reviews yet
            </div>
          ) : (
            reviews.map((r) => (
              <div
                key={r._id}

                className="stat-card"

                style={{
                  padding: "25px",

                  borderRadius:
                    "20px",

                  display: "flex",

                  gap: "20px",
                }}
              >

                {/* IMAGE */}
                <img
                  src={
                    r.reviewerImage ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt=""
                  style={{
                    width: "70px",

                    height: "70px",

                    borderRadius:
                      "50%",

                    objectFit:
                      "cover",
                  }}
                />

                {/* INFO */}
                <div>
                  <h3>
                    {r.reviewerName}
                  </h3>

                  <p
                    style={{
                      color:
                        "#f59e0b",

                      margin:
                        "8px 0",
                    }}
                  >
                    {"⭐".repeat(
                      r.rating
                    )}
                  </p>

                  <p
                    style={{
                      color:
                        "#555",

                      lineHeight:
                        "1.7",
                    }}
                  >
                    {r.review}
                  </p>
                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default PublicProfile;