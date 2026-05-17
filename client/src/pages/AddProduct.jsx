// client/src/pages/AddProduct.jsx

import {
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import "../pages/styles.css";

function AddProduct() {

  const [form, setForm] =
    useState({
      title: "",
      price: "",
      quantity: "",
      quantityUnit: "kg",
      images: [],
    });

  const [
    loading,
    setLoading,
  ] = useState(false);

  // =====================================
  // HANDLE INPUTS
  // =====================================
  const handleChange =
    (e) => {

      if (
        e.target.name ===
        "images"
      ) {

        setForm({
          ...form,

          images:
            e.target.files,
        });

      } else {

        setForm({
          ...form,

          [e.target.name]:
            e.target.value,
        });
      }
    };

  // =====================================
  // SUBMIT PRODUCT
  // =====================================
  const handleSubmit =
    async () => {

      try {

        if (
          !form.title ||
          !form.price ||
          !form.quantity
        ) {

          alert(
            "Please fill all fields"
          );

          return;
        }

        setLoading(true);

        const farmerId =
          localStorage.getItem(
            "userId"
          );

        const data =
          new FormData();

        data.append(
          "title",
          form.title
        );

        data.append(
          "price",
          form.price
        );

        data.append(
          "quantity",
          form.quantity
        );

        data.append(
          "quantityUnit",
          form.quantityUnit
        );

        data.append(
          "farmerId",
          farmerId
        );

        // MULTIPLE IMAGES
        for (
          let i = 0;
          i <
          form.images.length;
          i++
        ) {

          data.append(
            "images",
            form.images[i]
          );
        }

        await axios.post(
          "https://agroconnect-1-hyi3.onrender.com/api/add-product",

          data
        );

        alert(
          "Product Added Successfully ✅"
        );

        // RESET
        setForm({
          title: "",
          price: "",
          quantity: "",
          quantityUnit:
            "kg",
          images: [],
        });

        setLoading(false);

      } catch (err) {

        console.log(err);

        setLoading(false);

        alert(
          "Error adding product"
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
            "40px 25px",

          display:
            "flex",

          justifyContent:
            "center",

          alignItems:
            "center",
        }}
      >

        {/* =====================================
            CARD
        ===================================== */}
        <div
          style={{
            width:
              "100%",

            maxWidth:
              "700px",

            background:
              "white",

            borderRadius:
              "30px",

            padding:
              "40px",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.07)",
          }}
        >

          {/* HEADER */}
          <div
            style={{
              textAlign:
                "center",

              marginBottom:
                "35px",
            }}
          >

            <div
              style={{
                width:
                  "90px",

                height:
                  "90px",

                borderRadius:
                  "24px",

                background:
                  "#dcfce7",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                fontSize:
                  "42px",

                margin:
                  "0 auto 20px",
              }}
            >
              🌾
            </div>

            <h1
              style={{
                fontSize:
                  "44px",

                marginBottom:
                  "10px",
              }}
            >
              Add Product
            </h1>

            <p
              style={{
                color:
                  "#666",

                fontSize:
                  "16px",
              }}
            >
              Upload your farm products for companies
            </p>

          </div>

          {/* =====================================
              PRODUCT NAME
          ===================================== */}
          <div
            style={{
              marginBottom:
                "22px",
            }}
          >

            <label
              style={
                labelStyle
              }
            >
              Product Name
            </label>

            <input
              name="title"

              placeholder="Enter product name"

              value={form.title}

              onChange={
                handleChange
              }

              style={
                inputStyle
              }
            />

          </div>

          {/* =====================================
              PRICE
          ===================================== */}
          <div
            style={{
              marginBottom:
                "22px",
            }}
          >

            <label
              style={
                labelStyle
              }
            >
              Price
            </label>

            <input
              name="price"

              type="number"

              placeholder="Enter product price"

              value={form.price}

              onChange={
                handleChange
              }

              style={
                inputStyle
              }
            />

          </div>

          {/* =====================================
              QUANTITY
          ===================================== */}
          <div
            style={{
              marginBottom:
                "22px",
            }}
          >

            <label
              style={
                labelStyle
              }
            >
              Quantity
            </label>

            <div
              style={{
                display:
                  "flex",

                gap: "14px",
              }}
            >

              <input
                name="quantity"

                type="number"

                placeholder="Enter quantity"

                value={
                  form.quantity
                }

                onChange={
                  handleChange
                }

                style={{
                  ...inputStyle,

                  flex: 1,
                }}
              />

              <select
                name="quantityUnit"

                value={
                  form.quantityUnit
                }

                onChange={
                  handleChange
                }

                style={{
                  width:
                    "160px",

                  padding:
                    "15px",

                  borderRadius:
                    "16px",

                  border:
                    "1px solid #ddd",

                  fontSize:
                    "15px",

                  background:
                    "#fafafa",

                  outline:
                    "none",
                }}
              >

                <option value="kg">
                  KG
                </option>

                <option value="quintal">
                  Quintal
                </option>

                <option value="ton">
                  Ton
                </option>

                <option value="liter">
                  Liter
                </option>

                <option value="piece">
                  Piece
                </option>

              </select>

            </div>

          </div>

          {/* =====================================
              IMAGES
          ===================================== */}
          <div
            style={{
              marginBottom:
                "30px",
            }}
          >

            <label
              style={
                labelStyle
              }
            >
              Product Images
            </label>

            <input
              type="file"

              name="images"

              multiple

              onChange={
                handleChange
              }

              style={{
                width:
                  "100%",

                padding:
                  "14px",

                border:
                  "1px solid #ddd",

                borderRadius:
                  "16px",

                background:
                  "#fafafa",

                fontSize:
                  "15px",
              }}
            />

          </div>

          {/* =====================================
              BUTTON
          ===================================== */}
          <button
            onClick={
              handleSubmit
            }

            disabled={
              loading
            }

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
                "17px",

              borderRadius:
                "18px",

              fontSize:
                "17px",

              fontWeight:
                "700",

              cursor:
                "pointer",

              boxShadow:
                "0 8px 20px rgba(22,163,74,0.25)",
            }}
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>

        </div>

      </div>

    </div>
  );
}

// =====================================
// STYLES
// =====================================

const labelStyle = {
  display:
    "block",

  marginBottom:
    "9px",

  fontWeight:
    "600",

  color:
    "#222",

  fontSize:
    "15px",
};

const inputStyle = {
  width:
    "100%",

  padding:
    "15px",

  borderRadius:
    "16px",

  border:
    "1px solid #ddd",

  fontSize:
    "15px",

  outline:
    "none",

  background:
    "#fafafa",

  boxSizing:
    "border-box",
};

export default AddProduct;