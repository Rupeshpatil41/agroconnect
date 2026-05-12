// client/src/components/Sidebar.jsx

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

function Sidebar() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [
    collapsed,
    setCollapsed,
  ] = useState(false);

  // =====================================
  // GET USER ROLE
  // =====================================
  const role =
    localStorage.getItem(
      "role"
    );

  // =====================================
  // FARMER MENU
  // =====================================
  const farmerMenu = [
    {
      name:
        "Dashboard",

      path:
        "/farmer-dashboard",

      icon:
        "🏠",
    },

    {
      name:
        "Add Product",

      path:
        "/add-product",

      icon:
        "➕",
    },

    {
      name:
        "Orders",

      path:
        "/farmer-orders",

      icon:
        "📦",
    },

    {
      name:
        "Notifications",

      path:
        "/notifications",

      icon:
        "🔔",
    },

    // =====================================
    // PRICE PREDICTION
    // =====================================
    {
      name:
        "Price Prediction",

      path:
        "/price-prediction",

      icon:
        "📈",
    },

    {
      name:
        "Profile",

      path:
        "/profile",

      icon:
        "👤",
    },

    {
      name:
        "Chat",

      path:
        "/chat",

      icon:
        "💬",
    },
  ];

  // =====================================
  // COMPANY MENU
  // =====================================
  const companyMenu = [
    {
      name:
        "Dashboard",

      path:
        "/company-dashboard",

      icon:
        "🏠",
    },

    {
      name:
        "Browse Products",

      path:
        "/browse-products",

      icon:
        "🌾",
    },

    {
      name:
        "Orders",

      path:
        "/company-orders",

      icon:
        "📦",
    },

    {
      name:
        "Notifications",

      path:
        "/notifications",

      icon:
        "🔔",
    },

    {
      name:
        "Profile",

      path:
        "/profile",

      icon:
        "👤",
    },

    {
      name:
        "Chat",

      path:
        "/chat",

      icon:
        "💬",
    },
  ];

  // =====================================
  // ROLE BASED MENU
  // =====================================
  const menuItems =
    role === "company"
      ? companyMenu
      : farmerMenu;

  // =====================================
  // LOGOUT
  // =====================================
  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (
    <div
      style={{
        width:
          collapsed
            ? "90px"
            : "250px",

        height:
          "100vh",

        background:
          "#16a34a",

        position:
          "fixed",

        left: 0,

        top: 0,

        padding:
          "20px 16px",

        transition:
          "0.3s",

        display:
          "flex",

        flexDirection:
          "column",

        justifyContent:
          "space-between",

        overflow:
          "hidden",

        zIndex:
          999,
      }}
    >

      <div>

        {/* =====================================
            HEADER
        ===================================== */}
        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            marginBottom:
              "40px",
          }}
        >

          {!collapsed && (

            <h1
              style={{
                color:
                  "white",

                fontSize:
                  "30px",

                fontWeight:
                  "700",

                margin: 0,
              }}
            >
              AgroConnect
            </h1>
          )}

          <button
            onClick={() =>
              setCollapsed(
                !collapsed
              )
            }

            style={{
              background:
                "transparent",

              border:
                "none",

              color:
                "white",

              fontSize:
                "32px",

              cursor:
                "pointer",
            }}
          >
            ☰
          </button>

        </div>

        {/* =====================================
            MENU ITEMS
        ===================================== */}
        <div
          style={{
            display:
              "flex",

            flexDirection:
              "column",

            gap: "14px",
          }}
        >

          {menuItems.map(
            (item) => {

              const active =
                location.pathname ===
                item.path;

              return (
                <Link
                  key={
                    item.path
                  }

                  to={
                    item.path
                  }

                  style={{
                    textDecoration:
                      "none",

                    background:
                      active
                        ? "white"
                        : "transparent",

                    color:
                      active
                        ? "#16a34a"
                        : "white",

                    padding:
                      "15px 18px",

                    borderRadius:
                      "16px",

                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap: "14px",

                    fontWeight:
                      "600",

                    fontSize:
                      "17px",

                    transition:
                      "0.3s",
                  }}
                >

                  <span
                    style={{
                      fontSize:
                        "22px",
                    }}
                  >
                    {
                      item.icon
                    }
                  </span>

                  {!collapsed &&
                    item.name}

                </Link>
              );
            }
          )}

        </div>

      </div>

      {/* =====================================
          LOGOUT
      ===================================== */}
      <button
        onClick={logout}

        style={{
          background:
            "white",

          color:
            "#16a34a",

          border:
            "none",

          padding:
            "15px",

          borderRadius:
            "16px",

          fontWeight:
            "700",

          fontSize:
            "16px",

          cursor:
            "pointer",

          transition:
            "0.3s",
        }}
      >
        {!collapsed
          ? "Logout"
          : "↩"}
      </button>

    </div>
  );
}

export default Sidebar;