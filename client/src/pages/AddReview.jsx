// client/src/pages/AddReview.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import Sidebar from "../components/Sidebar";

function AddReview() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [
    rating,
    setRating,
  ] = useState(5);

  const [
    comment,
    setComment,
  ] = useState("");

  const [
    reviews,
    setReviews,
  ] = useState([]);

  const [
    product,
    setProduct,
  ] = useState(null);

  // =====================================
  // FETCH PRODUCT + REVIEWS
  // =====================================
 useEffect(() => {

  const loadData =
    async () => {

      await fetchProduct();

      await fetchReviews();
    };

  loadData();

}, [id]);
  // =====================================
  // FETCH PRODUCT
  // =====================================
  const fetchProduct =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/products"
          );

        const found =
          res.data.find(
            (p) =>
              p._id === id
          );

        setProduct(
          found
        );

      } catch (err) {

        console.log(err);
      }
    };

  // =====================================
  // FETCH REVIEWS
  // =====================================
  const fetchReviews =
    async () => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/reviews/${id}`
          );

        setReviews(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  // =====================================
  // SUBMIT REVIEW
  // =====================================
  const submitReview =
    async () => {

      try {

        const userId =
          localStorage.getItem(
            "userId"
          );

        if (
          !comment
        ) {

          return alert(
            "Please write review"
          );
        }

        await axios.post(
          "http://localhost:5000/api/add-review",

          {
            productId: id,

            userId,

            rating,

            comment,
          }
        );

        alert(
          "Review Added ✅"
        );

        setComment("");

        setRating(5);

        fetchReviews();

      } catch (err) {

        console.log(err);

        alert(
          "Error adding review"
        );
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

        {/* BACK */}
        <button
          onClick={() =>
            navigate(-1)
          }

          style={{
            padding:
              "12px 18px",

            border:
              "none",

            borderRadius:
              "12px",

            background:
              "#16a34a",

            color:
              "white",

            cursor:
              "pointer",

            marginBottom:
              "20px",
          }}
        >
          ← Back
        </button>

        {/* PRODUCT */}
        {product && (

          <div
            style={{
              background:
                "white",

              padding:
                "25px",

              borderRadius:
                "22px",

              marginBottom:
                "25px",

              boxShadow:
                "0 8px 20px rgba(0,0,0,0.05)",
            }}
          >

            <h1
              style={{
                marginBottom:
                  "10px",
              }}
            >
              {product.title}
            </h1>

            <p
              style={{
                color:
                  "#16a34a",

                fontSize:
                  "20px",

                fontWeight:
                  "700",
              }}
            >
              ₹{product.price}
            </p>

          </div>
        )}

        {/* REVIEW FORM */}
        <div
          style={{
            background:
              "white",

            padding:
              "30px",

            borderRadius:
              "22px",

            marginBottom:
              "30px",

            boxShadow:
              "0 8px 20px rgba(0,0,0,0.05)",
          }}
        >

          <h2
            style={{
              marginBottom:
                "20px",
            }}
          >
            ✍ Add Review
          </h2>

          {/* RATING */}
          <select
            value={rating}

            onChange={(e) =>
              setRating(
                Number(
                  e.target.value
                )
              )
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
            }}
          >

            <option value="5">
              ⭐⭐⭐⭐⭐
            </option>

            <option value="4">
              ⭐⭐⭐⭐
            </option>

            <option value="3">
              ⭐⭐⭐
            </option>

            <option value="2">
              ⭐⭐
            </option>

            <option value="1">
              ⭐
            </option>

          </select>

          {/* COMMENT */}
          <textarea
            rows="5"

            placeholder="Write your review..."

            value={comment}

            onChange={(e) =>
              setComment(
                e.target.value
              )
            }

            style={{
              width:
                "100%",

              padding:
                "16px",

              borderRadius:
                "16px",

              border:
                "1px solid #ddd",

              resize:
                "none",

              marginBottom:
                "20px",
            }}
          />

          {/* BUTTON */}
          <button
            onClick={
              submitReview
            }

            style={{
              background:
                "#16a34a",

              color:
                "white",

              border:
                "none",

              padding:
                "15px 30px",

              borderRadius:
                "14px",

              cursor:
                "pointer",

              fontWeight:
                "700",
            }}
          >
            Submit Review
          </button>

        </div>

        {/* REVIEWS */}
        <div>

          <h2
            style={{
              marginBottom:
                "20px",
            }}
          >
            Reviews
          </h2>

          {reviews.length ===
          0 ? (

            <div
              style={{
                background:
                  "white",

                padding:
                  "25px",

                borderRadius:
                  "18px",
              }}
            >
              No reviews yet
            </div>

          ) : (

            reviews.map(
              (
                r,
                index
              ) => (

                <div
                  key={index}

                  style={{
                    background:
                      "white",

                    padding:
                      "22px",

                    borderRadius:
                      "18px",

                    marginBottom:
                      "18px",

                    boxShadow:
                      "0 6px 16px rgba(0,0,0,0.05)",
                  }}
                >

                  <h3
                    style={{
                      marginBottom:
                        "10px",
                    }}
                  >
                    {"⭐".repeat(
                      r.rating
                    )}
                  </h3>

                  <p>
                    {r.comment}
                  </p>

                </div>
              )
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default AddReview;