// client/src/pages/Notifications.jsx

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

function Notifications() {

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  // =====================================
  // FETCH NOTIFICATIONS
  // =====================================
  const fetchNotifications =
    async () => {

      try {

        const userId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await axios.get(
            `https://agroconnect-1-hyi3.onrender.com/api/notifications/${userId}`
          );

        setNotifications(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  // =====================================
  // INITIAL FETCH
  // =====================================
  useEffect(() => {

    fetchNotifications();

  }, []);

  // =====================================
  // MARK AS READ
  // =====================================
  const markRead =
    async (id) => {

      try {

        await axios.put(
          `https://agroconnect-1-hyi3.onrender.com/api/mark-notification/${id}`
        );

        // REMOVE INSTANTLY FROM UI
        setNotifications(
          (prev) =>
            prev.filter(
              (n) =>
                n._id !== id
            )
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
            marginBottom:
              "35px",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            flexWrap:
              "wrap",

            gap: "15px",
          }}
        >

          {/* LEFT */}
          <div>

            <h1
              style={{
                fontSize:
                  "46px",

                marginBottom:
                  "10px",
              }}
            >
              🔔 Notifications
            </h1>

            <p
              style={{
                color:
                  "#666",

                fontSize:
                  "17px",
              }}
            >
              Stay updated with latest activity
            </p>

          </div>

          {/* COUNT */}
          <div
            style={{
              background:
                "#16a34a",

              color:
                "white",

              padding:
                "12px 22px",

              borderRadius:
                "16px",

              fontWeight:
                "700",

              fontSize:
                "15px",

              boxShadow:
                "0 8px 20px rgba(22,163,74,0.25)",
            }}
          >
            {notifications.length} New
          </div>

        </div>

        {/* =====================================
            EMPTY STATE
        ===================================== */}
        {notifications.length ===
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
              🎉
            </div>

            <h2
              style={{
                marginBottom:
                  "12px",
              }}
            >
              All caught up
            </h2>

            <p
              style={{
                color:
                  "#666",

                fontSize:
                  "16px",
              }}
            >
              No new notifications available
            </p>

          </div>

        ) : (

          <div
            style={{
              display:
                "flex",

              flexDirection:
                "column",

              gap: "18px",
            }}
          >

            {notifications.map(
              (n) => (

                <div
                  key={n._id}

                  style={{
                    background:
                      "white",

                    borderRadius:
                      "22px",

                    padding:
                      "22px",

                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",

                    gap: "20px",

                    flexWrap:
                      "wrap",

                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.06)",

                    borderLeft:
                      "7px solid #16a34a",
                  }}
                >

                  {/* =====================================
                      LEFT CONTENT
                  ===================================== */}
                  <div
                    style={{
                      flex: 1,
                    }}
                  >

                    <h3
                      style={{
                        margin:
                          0,

                        marginBottom:
                          "8px",

                        fontSize:
                          "22px",
                      }}
                    >
                      {n.title}
                    </h3>

                    <p
                      style={{
                        margin:
                          0,

                        color:
                          "#666",

                        fontSize:
                          "15px",

                        lineHeight:
                          "1.6",
                      }}
                    >
                      {n.message}
                    </p>

                  </div>

                  {/* =====================================
                      BUTTON
                  ===================================== */}
                  <button
                    onClick={() =>
                      markRead(
                        n._id
                      )
                    }

                    style={{
                      background:
                        "#16a34a",

                      color:
                        "white",

                      border:
                        "none",

                      padding:
                        "13px 20px",

                      borderRadius:
                        "14px",

                      fontSize:
                        "14px",

                      fontWeight:
                        "700",

                      cursor:
                        "pointer",

                      minWidth:
                        "120px",

                      boxShadow:
                        "0 6px 18px rgba(22,163,74,0.25)",
                    }}
                  >
                    Mark Read
                  </button>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default Notifications;