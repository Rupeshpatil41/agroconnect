// client/src/pages/LandingPage.jsx

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/logo.png";
import heroLogo from "../assets/heroLogo.png";
import axios from "axios";

function LandingPage() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] =
    useState("home");

    const [contact, setContact] =
  useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {

  setContact({
    ...contact,

    [e.target.name]:
      e.target.value,
  });
};

const sendMessage =
  async () => {

    try {

      await axios.post(
        "https://agroconnect-app-ksc5.onrender.com/api/contact",

        contact
      );

      alert(
        "Message Sent ✅"
      );

      setContact({
        name: "",
        email: "",
        message: "",
      });

    } catch (err) {

      console.log(err);

      alert(
        "Failed to send message"
      );
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #f0fdf4, #ffffff)",

        fontFamily:
          "Arial, sans-serif",

        overflowX: "hidden",

        minHeight: "100vh",
      }}
    >

      {/* =====================================
          NAVBAR
      ===================================== */}
      <nav
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          padding:
            "14px 50px",

          background:
            "rgba(255,255,255,0.92)",

          backdropFilter:
            "blur(12px)",

          position: "fixed",

          top: 0,

          left: 0,

          width: "100%",

          zIndex: 1000,

          boxShadow:
            "0 2px 10px rgba(0,0,0,0.05)",

          boxSizing:
            "border-box",
        }}
      >

        {/* LOGO */}
        <div
          style={{
            display: "flex",

            alignItems: "center",

            gap: "12px",
          }}
        >

          <img
            src={logo}
            alt="logo"

            style={{
              width: "48px",
            }}
          />

          <h1
            style={{
              fontSize: "26px",

              fontWeight:
                "700",
            }}
          >
            AgroConnect
          </h1>

        </div>

        {/* NAV LINKS */}
        <div
          style={{
            display: "flex",

            alignItems: "center",

            gap: "28px",
          }}
        >

          {[
            "home",
            "about",
            "features",
            "contact",
          ].map((item) => (
            <p
              key={item}

              onClick={() =>
                setActiveSection(item)
              }

              style={{
                cursor: "pointer",

                fontWeight:
                  activeSection === item
                    ? "700"
                    : "600",

                fontSize:
                  "15px",

                color:
                  activeSection === item
                    ? "#16a34a"
                    : "#333",

                textTransform:
                  "capitalize",

                transition:
                  "0.3s",

                margin: 0,
              }}
            >
              {item}
            </p>
          ))}

          <button
            onClick={() =>
              navigate("/login")
            }

            style={{
              background:
                "#16a34a",

              color: "white",

              border: "none",

              padding:
                "10px 22px",

              borderRadius:
                "12px",

              fontWeight:
                "600",

              cursor:
                "pointer",

              fontSize:
                "14px",
            }}
          >
            Login
          </button>

        </div>

      </nav>

      {/* =====================================
          HOME
      ===================================== */}
      {activeSection === "home" && (
        <section
          style={{
            minHeight: "100vh",

            display: "flex",

            alignItems: "center",

            justifyContent:
              "space-between",

            padding:
              "110px 50px 50px",

            gap: "50px",

            flexWrap: "wrap",
          }}
        >

          {/* LEFT */}
          <div
            style={{
              flex: 1,

              minWidth: "300px",
            }}
          >

            {/* HERO LOGO */}
            <img
              src={heroLogo}
              alt="hero logo"

              style={{
                width: "260px",

                marginBottom:
                  "-15px",
              }}
            />

            <h1
              style={{
                fontSize:
                  "64px",

                lineHeight:
                  "1.05",

                marginBottom:
                  "22px",

                fontWeight:
                  "800",
              }}
            >
              Empowering
              <br />

              <span
                style={{
                  color:
                    "#16a34a",
                }}
              >
                Farmers &
              </span>

              <br />
              Companies
            </h1>

            <p
              style={{
                fontSize:
                  "18px",

                color:
                  "#555",

                lineHeight:
                  "1.8",

                maxWidth:
                  "620px",

                marginBottom:
                  "32px",
              }}
            >
              AgroConnect helps
              farmers directly
              connect with
              companies for
              transparent
              business and better
              profits.
            </p>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",

                gap: "16px",

                flexWrap:
                  "wrap",
              }}
            >

              <button
                onClick={() =>
                  navigate(
                    "/register"
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
                    "14px 30px",

                  borderRadius:
                    "14px",

                  fontSize:
                    "15px",

                  fontWeight:
                    "700",

                  cursor:
                    "pointer",

                  boxShadow:
                    "0 8px 18px rgba(22,163,74,0.2)",
                }}
              >
                Get Started
              </button>

              <button
                onClick={() =>
                  setActiveSection(
                    "features"
                  )
                }

                style={{
                  background:
                    "white",

                  color:
                    "#16a34a",

                  border:
                    "2px solid #16a34a",

                  padding:
                    "14px 30px",

                  borderRadius:
                    "14px",

                  fontSize:
                    "15px",

                  fontWeight:
                    "700",

                  cursor:
                    "pointer",
                }}
              >
                Explore Features
              </button>

            </div>

            {/* STATS */}
            <div
              style={{
                display: "flex",

                gap: "35px",

                marginTop:
                  "45px",

                flexWrap:
                  "wrap",
              }}
            >

              {[
                {
                  value: "10K+",
                  label:
                    "Farmers",
                },

                {
                  value: "2K+",
                  label:
                    "Companies",
                },

                {
                  value: "50K+",
                  label:
                    "Orders",
                },
              ].map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={
                      index
                    }

                    style={{
                      background:
                        "white",

                      padding:
                        "20px",

                      borderRadius:
                        "18px",

                      minWidth:
                        "120px",

                      textAlign:
                        "center",

                      boxShadow:
                        "0 8px 18px rgba(0,0,0,0.06)",
                    }}
                  >

                    <h1
                      style={{
                        color:
                          "#16a34a",

                        fontSize:
                          "30px",

                        marginBottom:
                          "5px",
                      }}
                    >
                      {
                        item.value
                      }
                    </h1>

                    <p
                      style={{
                        color:
                          "#666",
                      }}
                    >
                      {
                        item.label
                      }
                    </p>

                  </div>
                )
              )}

            </div>

          </div>

          {/* RIGHT */}
          <div
            style={{
              flex: 1,

              display: "flex",

              justifyContent:
                "center",

              minWidth:
                "300px",
            }}
          >

            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"

              alt="farmer"

              style={{
                width: "100%",

                maxWidth:
                  "520px",

                borderRadius:
                  "30px",

                boxShadow:
                  "0 15px 35px rgba(0,0,0,0.12)",
              }}
            />

          </div>

        </section>
      )}

      {/* =====================================
          ABOUT
      ===================================== */}
      {activeSection === "about" && (
        <section
          style={{
            minHeight: "100vh",

            padding:
              "130px 50px",

            background:
              "white",
          }}
        >

          <div
            style={{
              textAlign:
                "center",

              marginBottom:
                "60px",
            }}
          >

            <h1
              style={{
                fontSize:
                  "52px",

                marginBottom:
                  "18px",
              }}
            >
              About AgroConnect
            </h1>

            <p
              style={{
                maxWidth:
                  "900px",

                margin:
                  "auto",

                fontSize:
                  "18px",

                color:
                  "#555",

                lineHeight:
                  "1.9",
              }}
            >
              AgroConnect is a
              smart agriculture
              platform designed to
              connect farmers and
              companies directly
              for transparent and
              profitable business.
            </p>

          </div>

          {/* ABOUT CARDS */}
          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",

              gap: "28px",
            }}
          >

            {[
              {
                icon: "🌱",
                title:
                  "Empowering Farmers",

                desc:
                  "Helping farmers earn better profits.",
              },

              {
                icon: "🏢",
                title:
                  "Helping Companies",

                desc:
                  "Connecting businesses with trusted farmers.",
              },

              {
                icon: "🤝",
                title:
                  "Building Trust",

                desc:
                  "Transparent reviews and verified users.",
              },
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={
                    index
                  }

                  style={{
                    background:
                      "#f8fafc",

                    padding:
                      "35px",

                    borderRadius:
                      "24px",

                    textAlign:
                      "center",

                    boxShadow:
                      "0 8px 18px rgba(0,0,0,0.06)",
                  }}
                >

                  <h1
                    style={{
                      fontSize:
                        "50px",

                      marginBottom:
                        "18px",
                    }}
                  >
                    {
                      item.icon
                    }
                  </h1>

                  <h2
                    style={{
                      marginBottom:
                        "12px",
                    }}
                  >
                    {
                      item.title
                    }
                  </h2>

                  <p
                    style={{
                      color:
                        "#555",

                      lineHeight:
                        "1.8",
                    }}
                  >
                    {
                      item.desc
                    }
                  </p>

                </div>
              )
            )}

          </div>

        </section>
      )}

      {/* =====================================
          FEATURES
      ===================================== */}
      {activeSection ===
        "features" && (
        <section
          style={{
            minHeight: "100vh",

            padding:
              "120px 50px",
          }}
        >

          <div
            style={{
              textAlign:
                "center",

              marginBottom:
                "55px",
            }}
          >

            <h1
              style={{
                fontSize:
                  "50px",

                marginBottom:
                  "14px",
              }}
            >
              Powerful Features
            </h1>

            <p
              style={{
                color:
                  "#555",

                fontSize:
                  "18px",
              }}
            >
              Modern features for
              smart agriculture.
            </p>

          </div>

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",

              gap: "24px",
            }}
          >

            {[
              {
                icon: "🌾",
                title:
                  "Marketplace",
                desc:
                  "Sell products directly.",
              },

              {
                icon: "💬",
                title:
                  "Live Chat",
                desc:
                  "Instant communication.",
              },

              {
                icon: "⭐",
                title:
                  "Reviews",
                desc:
                  "Public ratings system.",
              },

              {
                icon: "🔔",
                title:
                  "Notifications",
                desc:
                  "Real-time alerts.",
              },

              {
                icon: "📦",
                title:
                  "Orders",
                desc:
                  "Easy order management.",
              },

              {
                icon: "👤",
                title:
                  "Profiles",
                desc:
                  "Modern public profiles.",
              },
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={
                    index
                  }

                  style={{
                    background:
                      "white",

                    padding:
                      "30px",

                    borderRadius:
                      "22px",

                    textAlign:
                      "center",

                    boxShadow:
                      "0 8px 18px rgba(0,0,0,0.06)",
                  }}
                >

                  <h1
                    style={{
                      fontSize:
                        "45px",

                      marginBottom:
                        "14px",
                    }}
                  >
                    {
                      item.icon
                    }
                  </h1>

                  <h2
                    style={{
                      marginBottom:
                        "10px",
                    }}
                  >
                    {
                      item.title
                    }
                  </h2>

                  <p
                    style={{
                      color:
                        "#666",

                      lineHeight:
                        "1.7",
                    }}
                  >
                    {
                      item.desc
                    }
                  </p>

                </div>
              )
            )}

          </div>

        </section>
      )}

     {/* =====================================
    CONTACT
===================================== */}
{activeSection ===
  "contact" && (
  <section
    style={{
      minHeight: "100vh",

      padding:
        "120px 50px",

      background:
        "linear-gradient(to bottom,#f0fdf4,#ffffff)",

      display: "flex",

      flexDirection:
        "column",

      justifyContent:
        "center",
    }}
  >

    {/* HEADING */}
    <div
      style={{
        textAlign:
          "center",

        marginBottom:
          "60px",
      }}
    >

      <h1
        style={{
          fontSize:
            "52px",

          marginBottom:
            "18px",

          fontWeight:
            "800",
        }}
      >
        Contact Us
      </h1>

      <p
        style={{
          color:
            "#555",

          fontSize:
            "18px",

          maxWidth:
            "700px",

          margin:
            "auto",

          lineHeight:
            "1.8",
        }}
      >
        Have questions,
        partnership ideas or
        business inquiries?
        Connect with the
        AgroConnect team.
      </p>

    </div>

    {/* CONTACT CARDS */}
    <div
      style={{
        display: "grid",

        gridTemplateColumns:
          "repeat(auto-fit,minmax(260px,1fr))",

        gap: "28px",

        marginBottom:
          "50px",
      }}
    >

      {/* EMAIL */}
      <div
        style={{
          background:
            "white",

          padding: "35px",

          borderRadius:
            "24px",

          boxShadow:
            "0 10px 25px rgba(0,0,0,0.06)",

          textAlign:
            "center",
        }}
      >

        <div
          style={{
            fontSize:
              "48px",

            marginBottom:
              "16px",
          }}
        >
          📧
        </div>

        <h2
          style={{
            marginBottom:
              "10px",
          }}
        >
          Email Support
        </h2>

        <p
          style={{
            color:
              "#666",

            lineHeight:
              "1.8",
          }}
        >
          agroconnect@gmail.com
        </p>

      </div>

      {/* PHONE */}
      <div
        style={{
          background:
            "white",

          padding: "35px",

          borderRadius:
            "24px",

          boxShadow:
            "0 10px 25px rgba(0,0,0,0.06)",

          textAlign:
            "center",
        }}
      >

        <div
          style={{
            fontSize:
              "48px",

            marginBottom:
              "16px",
          }}
        >
          📞
        </div>

        <h2
          style={{
            marginBottom:
              "10px",
          }}
        >
          Call Us
        </h2>

        <p
          style={{
            color:
              "#666",

            lineHeight:
              "1.8",
          }}
        >
          +91 9373253451
        </p>

      </div>

      {/* ADDRESS */}
      <div
        style={{
          background:
            "white",

          padding: "35px",

          borderRadius:
            "24px",

          boxShadow:
            "0 10px 25px rgba(0,0,0,0.06)",

          textAlign:
            "center",
        }}
      >

        <div
          style={{
            fontSize:
              "48px",

            marginBottom:
              "16px",
          }}
        >
          📍
        </div>

        <h2
          style={{
            marginBottom:
              "10px",
          }}
        >
          Office Address
        </h2>

        <p
          style={{
            color:
              "#666",

            lineHeight:
              "1.8",
          }}
        >
          AgroConnect Pvt Ltd
          <br />
          IT Park, Nagpur
          <br />
          Maharashtra, India
        </p>

      </div>

    </div>

    {/* CONTACT FORM */}
    <div
      style={{
        background:
          "white",

        padding: "45px",

        borderRadius:
          "28px",

        boxShadow:
          "0 12px 30px rgba(0,0,0,0.06)",

        maxWidth:
          "900px",

        margin:
          "auto",

        width: "100%",
      }}
    >

      <h2
        style={{
          textAlign:
            "center",

          marginBottom:
            "30px",

          fontSize:
            "34px",
        }}
      >
        Send Message
      </h2>

      <div
        style={{
          display: "grid",

          gap: "20px",
        }}
      >

        <input
          name="name"
  placeholder="Your Name"
  value={contact.name}
  onChange={handleChange}

          style={{
            padding:
              "16px",

            borderRadius:
              "14px",

            border:
              "1px solid #ddd",

            fontSize:
              "16px",

            outline:
              "none",
          }}
        />

        <input
         name="email"
  placeholder="Your Email"
  value={contact.email}
  onChange={handleChange}

          style={{
            padding:
              "16px",

            borderRadius:
              "14px",

            border:
              "1px solid #ddd",

            fontSize:
              "16px",

            outline:
              "none",
          }}
        />

        <textarea
          name="message"
  placeholder="Write your message..."
  value={contact.message}
  onChange={handleChange}
          style={{
            padding:
              "16px",

            borderRadius:
              "14px",

            border:
              "1px solid #ddd",

            fontSize:
              "16px",

            outline:
              "none",

            resize:
              "none",
          }}
        />

        <button onClick={sendMessage}
          style={{
            background:
              "#16a34a",

            color:
              "white",

            border:
              "none",

            padding:
              "16px",

            borderRadius:
              "14px",

            fontSize:
              "16px",

            fontWeight:
              "700",

            cursor:
              "pointer",

            boxShadow:
              "0 8px 20px rgba(22,163,74,0.25)",
          }}
        >
          Send Message
        </button>

      </div>

    </div>

  </section>
)}
    </div>
  );
}

export default LandingPage;