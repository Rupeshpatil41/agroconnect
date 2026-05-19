// client/src/pages/BrowseProducts.jsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import "../pages/styles.css";

function BrowseProducts() {

  const navigate =
    useNavigate();

  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    orderedProducts,
    setOrderedProducts,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    maxPrice,
    setMaxPrice,
  ] = useState("");

  const [
    quantities,
    setQuantities,
  ] = useState({});

  // =====================================
  // LOAD DATA
  // =====================================
  useEffect(() => {

    fetchProducts();

    fetchOrders();

  }, []);

  // =====================================
  // FETCH PRODUCTS
  // =====================================
  const fetchProducts =
    async () => {

      try {

       const res = await axios.get(
  `https://agroconnect-1-hyi3.onrender.com/api/company-orders/${companyId}`
);
          console.log(res.data);

        setProducts(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  // =====================================
  // FETCH ORDERS
  // =====================================
  const fetchOrders =
    async () => {

      try {

        const companyId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await axios.get(
            `https://agroconnect-1-hyi3.onrender.com/company-orders/${companyId}`
          );

        const orderedIds =
          res.data.map(
            (o) =>
              o.productId
          );

        setOrderedProducts(
          orderedIds
        );

      } catch (err) {

        console.log(err);
      }
    };

  // =====================================
  // HANDLE QUANTITY
  // =====================================
  const handleQtyChange =
    (
      id,
      value,
      maxQty
    ) => {

      const val =
        Number(value);

      if (
        val > maxQty
      ) {

        alert(
          "Exceeds available stock!"
        );

        return;
      }

      setQuantities(
        (prev) => ({
          ...prev,

          [id]: val,
        })
      );
    };

  // =====================================
  // PLACE ORDER
  // =====================================
  const placeOrder =
    async (
      product
    ) => {

      try {

        const companyId =
          localStorage.getItem(
            "userId"
          );

        const qty =
          quantities[
            product._id
          ] || 1;

        if (
          qty <= 0
        ) {

          return alert(
            "Invalid quantity"
          );
        }

        if (
          qty >
          product.quantity
        ) {

          return alert(
            "Not enough stock"
          );
        }

        await axios.post(
          "https://agroconnect-1-hyi3.onrender.com/place-order",

          {
            productId:
              product._id,

            productTitle:
              product.title,

            price:
              product.price,

            quantity:
              `${qty} ${product.quantityUnit || "kg"}`,

            farmerId:
              product.farmerId,

            companyId,
          }
        );

        alert(
          "Order Placed Successfully ✅"
        );

        setOrderedProducts(
          (prev) => [
            ...prev,
            product._id,
          ]
        );

      } catch (err) {

        console.log(err);

        alert(
          "Error placing order"
        );
      }
    };

  // =====================================
  // FILTER PRODUCTS
  // =====================================
  const filteredProducts =
    useMemo(() => {

      return products.filter(
        (p) => {

          const matchesSearch =
            p.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesPrice =
            maxPrice
              ? Number(
                  p.price
                ) <=
                Number(
                  maxPrice
                )
              : true;

          return (
            matchesSearch &&
            matchesPrice
          );
        }
      );

    }, [
      products,
      search,
      maxPrice,
    ]);

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

          padding:
            "35px 30px",

          background:
            "#f5f7fb",

          minHeight:
            "100vh",
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
            🌾 Browse Products
          </h1>

          <p
            style={{
              color:
                "#666",

              fontSize:
                "17px",
            }}
          >
            Explore and order products directly from farmers
          </p>

        </div>

        {/* =====================================
            FILTERS
        ===================================== */}
        <div
          style={{
            display:
              "flex",

            gap: "16px",

            marginBottom:
              "35px",

            flexWrap:
              "wrap",
          }}
        >

          {/* SEARCH */}
          <input
            type="text"

            placeholder="Search products..."

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            style={{
              flex: 1,

              minWidth:
                "250px",

              padding:
                "15px",

              borderRadius:
                "16px",

              border:
                "1px solid #ddd",

              fontSize:
                "15px",

              background:
                "white",
            }}
          />

          {/* PRICE */}
          <input
            type="number"

            placeholder="Max Price"

            value={maxPrice}

            onChange={(e) =>
              setMaxPrice(
                e.target.value
              )
            }

            style={{
              width:
                "190px",

              padding:
                "15px",

              borderRadius:
                "16px",

              border:
                "1px solid #ddd",

              fontSize:
                "15px",

              background:
                "white",
            }}
          />

        </div>

        {/* =====================================
            PRODUCTS
        ===================================== */}
        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",

            gap: "26px",
          }}
        >

          {filteredProducts.map(
            (p) => {

              const isOrdered =
                orderedProducts.includes(
                  p._id
                );

              const selectedQty =
                quantities[
                  p._id
                ] || 1;

              return (

                <div
                  key={p._id}

                  onClick={() =>
                    navigate(
                      `/product/${p._id}`
                    )
                  }

                  style={{
                    background:
                      "white",

                    borderRadius:
                      "26px",

                    overflow:
                      "hidden",

                    cursor:
                      "pointer",

                    boxShadow:
                      "0 10px 24px rgba(0,0,0,0.06)",

                    transition:
                      "0.3s",
                  }}
                >

                  {/* IMAGE */}
                  <img
                    src={
                      p.images?.length > 0
                        ? `https://agroconnect-1-hyi3.onrender.com/uploads/${p.images[0]}`
                        : "https://via.placeholder.com/400x250"
                    }

                    alt={p.title}

                    style={{
                      width:
                        "100%",

                      height:
                        "240px",

                      objectFit:
                        "cover",
                    }}
                  />

                  {/* CONTENT */}
                  <div
                    style={{
                      padding:
                        "22px",
                    }}
                  >

                    <h2
                      style={{
                        marginBottom:
                          "14px",

                        fontSize:
                          "28px",
                      }}
                    >
                      {p.title}
                    </h2>

                    <p
                      style={{
                        marginBottom:
                          "8px",
                      }}
                    >
                      <strong>
                        Price:
                      </strong>{" "}
                      ₹{p.price}
                    </p>

                    <p
                      style={{
                        marginBottom:
                          "14px",
                      }}
                    >
                      <strong>
                        Available:
                      </strong>{" "}
                      {p.quantity}{" "}
                      {p.quantityUnit || "kg"}
                    </p>

                    {/* QUANTITY */}
                    <input
                      type="number"

                      min="1"

                      value={
                        selectedQty
                      }

                      onChange={(
                        e
                      ) =>
                        handleQtyChange(
                          p._id,

                          e.target
                            .value,

                          p.quantity
                        )
                      }

                      onClick={(
                        e
                      ) =>
                        e.stopPropagation()
                      }

                      style={{
                        width:
                          "100%",

                        padding:
                          "14px",

                        borderRadius:
                          "14px",

                        border:
                          "1px solid #ddd",

                        marginBottom:
                          "18px",

                        fontSize:
                          "15px",
                      }}
                    />

                    {/* BUTTON */}
                    {isOrdered ? (

                      <button
                        disabled

                        style={{
                          width:
                            "100%",

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

                          opacity:
                            0.7,
                        }}
                      >
                        ✅ Ordered
                      </button>

                    ) : (

                      <button
                        onClick={(
                          e
                        ) => {

                          e.stopPropagation();

                          placeOrder(
                            p
                          );
                        }}

                        style={{
                          width:
                            "100%",

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
                        Order Now
                      </button>

                    )}

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>

    </div>
  );
}

export default BrowseProducts;