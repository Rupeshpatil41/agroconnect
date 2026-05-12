// client/src/pages/CompanyOrders.jsx

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";

import "../pages/styles.css";

function CompanyOrders() {

  const navigate =
    useNavigate();

  const companyId =
    localStorage.getItem(
      "userId"
    );

  const [
    orders,
    setOrders,
  ] = useState([]);

  // =====================================
  // LOAD ORDERS
  // =====================================
  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders =
    async () => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/company-orders/${companyId}`
          );

        setOrders(
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

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
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
            "35px",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            marginBottom:
              "30px",
          }}
        >

          <h1
            style={{
              fontSize:
                "42px",

              marginBottom:
                "10px",
            }}
          >
            📦 Company Orders
          </h1>

          <p
            style={{
              color:
                "#666",

              fontSize:
                "16px",
            }}
          >
            Manage your purchased products
          </p>

        </div>

        {/* ORDERS */}
        <div
          style={{
            display:
              "flex",

            flexDirection:
              "column",

            gap: "24px",
          }}
        >

          {orders.length ===
          0 ? (

            <div
              className="stat-card"
            >
              No orders found
            </div>

          ) : (

            orders.map(
              (o) => (

                <div
                  key={o._id}

                  className="stat-card"

                  style={{
                    padding:
                      "28px",

                    borderRadius:
                      "24px",

                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",

                    flexWrap:
                      "wrap",

                    gap: "20px",
                  }}
                >

                  {/* LEFT */}
                  <div>

                    <h2
                      style={{
                        marginBottom:
                          "12px",
                      }}
                    >
                      {
                        o.productTitle
                      }
                    </h2>

                    <p
                      style={{
                        marginBottom:
                          "8px",

                        color:
                          "#555",
                      }}
                    >
                      💰 Price:
                      ₹{o.price}
                    </p>

                    <p
                      style={{
                        marginBottom:
                          "8px",

                        color:
                          "#555",
                      }}
                    >
                      📦 Quantity:
                      {o.quantity}
                    </p>

                    <p
                      style={{
                        color:
                          "#555",
                      }}
                    >
                      🚚 Status:

                      <span
                        style={{
                          color:
                            "#16a34a",

                          fontWeight:
                            "700",

                          marginLeft:
                            "8px",
                        }}
                      >
                        {
                          o.status ||
                          "Completed"
                        }
                      </span>

                    </p>

                  </div>

                  {/* RIGHT */}
                  <div
                    style={{
                      display:
                        "flex",

                      gap: "14px",

                      flexWrap:
                        "wrap",
                    }}
                  >

                    {/* VIEW FARMER */}
                    <button
                      onClick={() =>
                        navigate(
                          `/profile/${o.farmerId}`
                        )
                      }

                      style={{
                        background:
                          "#f1f5f9",

                        border:
                          "none",

                        padding:
                          "14px 24px",

                        borderRadius:
                          "14px",

                        cursor:
                          "pointer",

                        fontWeight:
                          "600",
                      }}
                    >
                      👤 View Farmer
                    </button>

                    {/* ADD REVIEW */}
                    <button
                      onClick={() =>
                        navigate(
                          `/reviews/${o.productId}`
                        )
                      }

                      style={{
                        background:
                          "linear-gradient(to right, #16a34a, #22c55e)",

                        color:
                          "white",

                        border:
                          "none",

                        padding:
                          "14px 24px",

                        borderRadius:
                          "14px",

                        cursor:
                          "pointer",

                        fontWeight:
                          "600",
                      }}
                    >
                      ⭐ Add Review
                    </button>

                  </div>

                </div>
              )
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default CompanyOrders;