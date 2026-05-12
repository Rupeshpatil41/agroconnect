// client/src/pages/Profile.jsx

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

function Profile() {

  const storedUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    ) || {};

  const [
    name,
    setName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    phone,
    setPhone,
  ] = useState("");

  const [
    address,
    setAddress,
  ] = useState("");

  const [
    bio,
    setBio,
  ] = useState("");

  const [
    image,
    setImage,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  // =====================================
  // LOAD PROFILE
  // =====================================
  useEffect(() => {

    if (storedUser) {

      setName(
        storedUser.name || ""
      );

      setEmail(
        storedUser.email || ""
      );

      setPhone(
        storedUser.phone || ""
      );

      setAddress(
        storedUser.address || ""
      );

      setBio(
        storedUser.bio || ""
      );

      setImage(
        storedUser.image || ""
      );
    }

  }, []);

  // =====================================
  // IMAGE UPLOAD
  // =====================================
  const uploadImage =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file)
        return;

      const data =
        new FormData();

      data.append(
        "file",
        file
      );

      data.append(
        "upload_preset",
        "ml_default"
      );

      try {

        setLoading(true);

        const res =
          await axios.post(
            "https://api.cloudinary.com/v1_1/drxxmtjfm/image/upload",
            data
          );

        setImage(
          res.data.secure_url
        );

        setLoading(false);

      } catch (err) {

        console.log(err);

        setLoading(false);
      }
    };

  // =====================================
  // SAVE PROFILE
  // =====================================
  const saveProfile =
    async () => {

      try {

        if (
          !storedUser?._id
        ) {

          alert(
            "Please login again"
          );

          return;
        }

        const res =
          await axios.put(
            `https://agroconnect-1-hyi3.onrender.com/api/profile/${storedUser._id}`,

            {
              name,
              email,
              phone,
              address,
              bio,
              image,
            }
          );

        localStorage.setItem(
          "user",

          JSON.stringify(
            res.data
          )
        );

        alert(
          "Profile Updated Successfully ✅"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Update Failed"
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
            PROFILE CARD
        ===================================== */}
        <div
          style={{
            maxWidth:
              "900px",

            margin:
              "auto",

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

            <h1
              style={{
                fontSize:
                  "46px",

                marginBottom:
                  "10px",
              }}
            >
              👤 My Profile
            </h1>

            <p
              style={{
                color:
                  "#666",

                fontSize:
                  "16px",
              }}
            >
              Manage your account details
            </p>

          </div>

          {/* =====================================
              IMAGE
          ===================================== */}
          <div
            style={{
              display:
                "flex",

              flexDirection:
                "column",

              alignItems:
                "center",

              marginBottom:
                "35px",
            }}
          >

            <img
              src={
                image
                  ? image
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }

              alt="profile"

              style={{
                width:
                  "160px",

                height:
                  "160px",

                borderRadius:
                  "50%",

                objectFit:
                  "cover",

                border:
                  "5px solid #16a34a",

                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.12)",

                marginBottom:
                  "20px",
              }}
            />

            <input
              type="file"

              onChange={
                uploadImage
              }

              style={{
                width:
                  "100%",

                maxWidth:
                  "350px",

                padding:
                  "14px",

                border:
                  "1px solid #ddd",

                borderRadius:
                  "14px",

                background:
                  "#fafafa",
              }}
            />

          </div>

          {/* =====================================
              FORM
          ===================================== */}
          <div
            style={{
              display:
                "grid",

              gap: "20px",
            }}
          >

            {/* NAME */}
            <div>

              <label
                style={
                  labelStyle
                }
              >
                Full Name
              </label>

              <input
                type="text"

                placeholder="Enter your name"

                value={name}

                onChange={(
                  e
                ) =>
                  setName(
                    e.target
                      .value
                  )
                }

                style={
                  inputStyle
                }
              />

            </div>

            {/* EMAIL */}
            <div>

              <label
                style={
                  labelStyle
                }
              >
                Email
              </label>

              <input
                type="email"

                placeholder="Enter email"

                value={email}

                onChange={(
                  e
                ) =>
                  setEmail(
                    e.target
                      .value
                  )
                }

                style={
                  inputStyle
                }
              />

            </div>

            {/* PHONE */}
            <div>

              <label
                style={
                  labelStyle
                }
              >
                Phone
              </label>

              <input
                type="text"

                placeholder="Enter phone number"

                value={phone}

                onChange={(
                  e
                ) =>
                  setPhone(
                    e.target
                      .value
                  )
                }

                style={
                  inputStyle
                }
              />

            </div>

            {/* ADDRESS */}
            <div>

              <label
                style={
                  labelStyle
                }
              >
                Address
              </label>

              <input
                type="text"

                placeholder="Enter address"

                value={address}

                onChange={(
                  e
                ) =>
                  setAddress(
                    e.target
                      .value
                  )
                }

                style={
                  inputStyle
                }
              />

            </div>

            {/* BIO */}
            <div>

              <label
                style={
                  labelStyle
                }
              >
                Bio
              </label>

              <textarea
                rows="4"

                placeholder="Write something about yourself"

                value={bio}

                onChange={(
                  e
                ) =>
                  setBio(
                    e.target
                      .value
                  )
                }

                style={{
                  ...inputStyle,

                  resize:
                    "none",
                }}
              />

            </div>

            {/* BUTTON */}
            <button
              onClick={
                saveProfile
              }

              disabled={
                loading
              }

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
                  "16px",

                fontSize:
                  "17px",

                fontWeight:
                  "700",

                cursor:
                  "pointer",

                marginTop:
                  "10px",

                boxShadow:
                  "0 8px 20px rgba(22,163,74,0.25)",
              }}
            >
              {loading
                ? "Uploading..."
                : "Save Profile"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

// =====================================
// INPUT STYLE
// =====================================

const labelStyle = {
  display:
    "block",

  marginBottom:
    "8px",

  fontWeight:
    "600",

  color:
    "#222",
};

const inputStyle = {
  width:
    "100%",

  padding:
    "15px",

  borderRadius:
    "14px",

  border:
    "1px solid #ddd",

  fontSize:
    "15px",

  outline:
    "none",

  background:
    "#fafafa",
};

export default Profile;