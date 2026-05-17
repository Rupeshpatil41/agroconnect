// client/src/pages/ProductDetail.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

import "../pages/styles.css";

function ProductDetail() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [
    product,
    setProduct,
  ] = useState(null);

  const [
    allProducts,
    setAllProducts,
  ] = useState([]);

  const [
    qty,
    setQty,
  ] = useState(1);

  const [
    selectedImage,
    setSelectedImage,
  ] = useState("");

  // =====================================
  // FETCH DATA
  // =====================================
  useEffect(() => {

    fetchData();

  }, [id]);

  const fetchData =
    async () => {

      try {

        const res =
          await axios.get(
            "https://agroconnect-app-ksc5.onrender.com/api/products"
          );

        setAllProducts(
          res.data
        );

        const found =
          res.data.find(
            (p) =>
              p._id === id
          );

        setProduct(
          found
        );

        if (
          found?.images
            ?.length > 0
        ) {

          setSelectedImage(
            found.images[0]
          );
        }

      } catch (err) {

        console.log(err);
      }
    };

  // =====================================
  // PLACE ORDER
  // =====================================
  const placeOrder =
    async () => {

      try {

        const companyId =
          localStorage.getItem(
            "userId"
          );

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
          "https://agroconnect-app-ksc5.onrender.com/api/place-order",

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

      } catch (err) {

        console.log(err);

        alert(
          "Error placing order"
        );
      }
    };

  if (!product) {

    return (
      <h2
        style={{
          padding:
            "20px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div
      className="main"
      style={{
        padding:
          "30px",
      }}
    >

      {/* BACK */}
      <button
        className="secondary"

        onClick={() =>
          navigate(-1)
        }

        style={{
          marginBottom:
            "20px",
        }}
      >
        ← Back
      </button>

      {/* MAIN CARD */}
      <div
        style={{
          background:
            "white",

          padding:
            "35px",

          borderRadius:
            "22px",

          display:
            "flex",

          gap: "40px",

          flexWrap:
            "wrap",

          boxShadow:
            "0 8px 25px rgba(0,0,0,0.06)",
        }}
      >

        {/* =====================================
            IMAGE GALLERY
        ===================================== */}
        <div
          style={{
            flex: 1,

            minWidth:
              "320px",
          }}
        >

          {selectedImage && (

            <img
              src={`https://agroconnect-app-ksc5.onrender.com/uploads/${selectedImage}`}

              alt="product"

              style={{
                width:
                  "100%",

                height:
                  "420px",

                objectFit:
                  "cover",

                borderRadius:
                  "18px",

                marginBottom:
                  "14px",
              }}
            />
          )}

          {/* THUMBNAILS */}
          <div
            style={{
              display:
                "flex",

              gap: "12px",

              flexWrap:
                "wrap",
            }}
          >

            {product.images?.map(
              (
                img,
                i
              ) => (

                <img
                  key={i}

                  src={`https://agroconnect-app-ksc5.onrender.com/uploads/${img}`}

                  alt="thumb"

                  onClick={() =>
                    setSelectedImage(
                      img
                    )
                  }

                  style={{
                    width:
                      "85px",

                    height:
                      "85px",

                    objectFit:
                      "cover",

                    borderRadius:
                      "10px",

                    cursor:
                      "pointer",

                    border:
                      selectedImage ===
                      img
                        ? "3px solid #16a34a"
                        : "1px solid #ddd",
                  }}
                />
              )
            )}

          </div>

        </div>

        {/* =====================================
            DETAILS
        ===================================== */}
        <div
          style={{
            flex: 1,

            minWidth:
              "320px",
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
            {
              product.title
            }
          </h1>

          <h2
            style={{
              color:
                "#16a34a",

              marginBottom:
                "16px",
            }}
          >
            ₹
            {
              product.price
            }
          </h2>

          <p
            style={{
              fontSize:
                "17px",

              marginBottom:
                "20px",
            }}
          >
            <strong>
              Available:
            </strong>{" "}
            {
              product.quantity
            }{" "}
            {
              product.quantityUnit ||
              "kg"
            }
          </p>

          {/* QUANTITY */}
          <input
            type="number"

            value={qty}

            min="1"

            onChange={(e) =>
              setQty(
                Number(
                  e.target.value
                )
              )
            }

            style={{
              padding:
                "14px",

              width:
                "160px",

              borderRadius:
                "12px",

              border:
                "1px solid #ccc",

              marginBottom:
                "20px",

              fontSize:
                "16px",
            }}
          />

          <br />

          {/* BUTTONS */}
          <div
            style={{
              display:
                "flex",

              gap: "15px",

              flexWrap:
                "wrap",
            }}
          >

            <button
              className="primary"

              onClick={
                placeOrder
              }
            >
              Order Now
            </button>

            {/* REVIEW BUTTON */}
            <button
              className="secondary"

              onClick={() =>
                navigate(
                  `/reviews/${product._id}`
                )
              }
            >
              ➕ Add Review
            </button>

          </div>

        </div>

      </div>

      {/* =====================================
          SIMILAR PRODUCTS
      ===================================== */}
      <h2
        style={{
          marginTop:
            "45px",

          marginBottom:
            "25px",
        }}
      >
        Similar Products
      </h2>

      <div
        className="stats"
      >

        {allProducts
          .filter(
            (p) =>
              p._id !==
              product._id
          )
          .slice(0, 3)
          .map((p) => (

            <div
              key={p._id}

              className="stat-card"

              onClick={() =>
                navigate(
                  `/product/${p._id}`
                )
              }

              style={{
                cursor:
                  "pointer",
              }}
            >

              {p.images?.[0] && (

                <img
                  src={`https://agroconnect-app-ksc5.onrender.com/uploads/${p.images[0]}`}

                  alt="product"

                  style={{
                    width:
                      "100%",

                    height:
                      "180px",

                    objectFit:
                      "cover",

                    borderRadius:
                      "12px",

                    marginBottom:
                      "12px",
                  }}
                />
              )}

              <h3>
                {p.title}
              </h3>

              <p>
                ₹{p.price}
              </p>

            </div>
          ))}

      </div>

    </div>
  );
}

export default ProductDetail;