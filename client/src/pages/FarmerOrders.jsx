// client/src/pages/FarmerOrders.jsx

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import "../pages/styles.css";

function FarmerOrders() {

  const [
    orders,
    setOrders,
  ] = useState([]);

  // =====================================
  // FETCH ORDERS
  // =====================================
  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders =
    async () => {

      try {

        const farmerId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await axios.get(
            `http://localhost:5000/api/farmer-orders/${farmerId}`
          );

        setOrders(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  // =====================================
  // UPDATE STATUS
  // =====================================
  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        await axios.put(
          `http://localhost:5000/api/update-order/${id}`,

          { status }
        );

        fetchOrders();

      } catch (err) {

        console.log(err);

        alert(
          "Error updating order"
        );
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
            marginBottom:
              "35px",
          }}
        >

          <h1
            style={{
              fontSize:
                "46px",

              marginBottom:
                "10px",
            }}
          >
            📦 Farmer Orders
          </h1>

          <p
            style={{
              color:
                "#666",

              fontSize:
                "17px",
            }}
          >
            Accept or reject company orders
          </p>

        </div>

        {/* =====================================
            EMPTY STATE
        ===================================== */}
        {orders.length ===
        0 ? (

          <div
            style={{
              background:
                "white",

              borderRadius:
                "28px",

              padding:
                "70px 30px",

              textAlign:
                "center",

              boxShadow:
                "0 10px 25px rgba(0,0,0,0.06)",
            }}
          >

            <div
              style={{
                fontSize:
                  "70px",

                marginBottom:
                  "20px",
              }}
            >
              📭
            </div>

            <h2
              style={{
                marginBottom:
                  "12px",
              }}
            >
              No Orders Yet
            </h2>

            <p
              style={{
                color:
                  "#666",

                fontSize:
                  "16px",
              }}
            >
              Orders from companies will appear here
            </p>

          </div>

        ) : (

          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(340px, 1fr))",

              gap: "24px",
            }}
          >

            {orders.map(
              (o) => {

                const status =
                  o.status?.toLowerCase();

                return (

                  <div
                    key={o._id}

                    style={{
                      background:
                        "white",

                      borderRadius:
                        "28px",

                      padding:
                        "28px",

                      boxShadow:
                        "0 10px 24px rgba(0,0,0,0.06)",

                      transition:
                        "0.3s",
                    }}
                  >

                    {/* PRODUCT */}
                    <div
                      style={{
                        marginBottom:
                          "22px",
                      }}
                    >

                      <h2
                        style={{
                          fontSize:
                            "30px",

                          marginBottom:
                            "10px",
                        }}
                      >
                        🌾 {
                          o.productTitle
                        }
                      </h2>

                    </div>

                    {/* DETAILS */}
                    <div
                      style={{
                        display:
                          "flex",

                        flexDirection:
                          "column",

                        gap: "12px",

                        marginBottom:
                          "24px",
                      }}
                    >

                      <p>
                        <strong>
                          Price:
                        </strong>{" "}
                        ₹{o.price}
                      </p>

                      <p>
                        <strong>
                          Quantity:
                        </strong>{" "}
                        {o.quantity}
                      </p>

                      <p>
                        <strong>
                          Status:
                        </strong>{" "}

                        <span
                          style={{
                            color:
                              status ===
                              "accepted"
                                ? "#16a34a"
                                : status ===
                                  "rejected"
                                ? "#dc2626"
                                : "#f59e0b",

                            fontWeight:
                              "700",

                            textTransform:
                              "capitalize",
                          }}
                        >
                          {status}
                        </span>

                      </p>

                    </div>

                    {/* =====================================
                        PENDING BUTTONS
                    ===================================== */}
                    {status ===
                    "pending" ? (

                      <div
                        style={{
                          display:
                            "flex",

                          gap: "14px",
                        }}
                      >

                        {/* ACCEPT */}
                        <button
                          onClick={() =>
                            updateStatus(
                              o._id,
                              "accepted"
                            )
                          }

                          style={{
                            flex: 1,

                            background:
                              "#16a34a",

                            color:
                              "white",

                            border:
                              "none",

                            padding:
                              "15px",

                            borderRadius:
                              "16px",

                            fontWeight:
                              "700",

                            fontSize:
                              "15px",

                            cursor:
                              "pointer",
                          }}
                        >
                          Accept
                        </button>

                        {/* REJECT */}
                        <button
                          onClick={() =>
                            updateStatus(
                              o._id,
                              "rejected"
                            )
                          }

                          style={{
                            flex: 1,

                            background:
                              "#dc2626",

                            color:
                              "white",

                            border:
                              "none",

                            padding:
                              "15px",

                            borderRadius:
                              "16px",

                            fontWeight:
                              "700",

                            fontSize:
                              "15px",

                            cursor:
                              "pointer",
                          }}
                        >
                          Reject
                        </button>

                      </div>

                    ) : (

                      /* STATUS BOX */
                      <div
                        style={{
                          padding:
                            "16px",

                          borderRadius:
                            "16px",

                          textAlign:
                            "center",

                          background:
                            status ===
                            "accepted"
                              ? "#dcfce7"
                              : "#fee2e2",

                          color:
                            status ===
                            "accepted"
                              ? "#166534"
                              : "#991b1b",

                          fontWeight:
                            "700",

                          textTransform:
                            "capitalize",

                          fontSize:
                            "15px",
                        }}
                      >
                        Order {status}
                      </div>

                    )}

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default FarmerOrders;