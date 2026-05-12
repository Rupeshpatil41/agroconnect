// client/src/pages/Profile.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/styles.css";

function Profile() {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    bio: "",
    experience: "",
    farmType: "",
    website: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/profile/${userId}`
      );

      const data = res.data;

      setForm({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        companyName: data.companyName || "",
        bio: data.bio || "",
        experience: data.experience || "",
        farmType: data.farmType || "",
        website: data.website || "",
        image: null,
      });

      if (data.image) {
        setPreview(data.image);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];

      setForm({
        ...form,
        image: file,
      });

      setPreview(URL.createObjectURL(file));

    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      await axios.put(
        `http://localhost:5000/api/profile/${userId}`,
        formData
      );

      alert("Profile Updated ✅");

      fetchProfile();

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Error updating profile");
    }
  };

  return (
    <div className="main">

      {/* BANNER */}
      <div
        style={{
          height: "220px",
          borderRadius: "20px",
          background:
            "linear-gradient(135deg, #16a34a, #22c55e)",
          position: "relative",
          overflow: "hidden",
          marginBottom: "80px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >

        {/* PROFILE IMAGE */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "40px",
          }}
        >
          <img
            src={
              preview ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid white",
              background: "white",
            }}
          />
        </div>

      </div>

      {/* PROFILE CARD */}
      <div
        className="stat-card"
        style={{
          padding: "40px",
          borderRadius: "20px",
          marginTop: "-40px",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            marginBottom: "30px",
            marginLeft: "160px",
          }}
        >
          <h1 style={{ marginBottom: "5px" }}>
            {role === "company"
              ? form.companyName || "Company"
              : form.name || "Farmer"}
          </h1>

          <p style={{ color: "#666" }}>
            {role === "company"
              ? "🏢 Verified Buyer"
              : "🌾 Trusted Farmer"}
          </p>
        </div>

        {/* IMAGE INPUT */}
        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              fontWeight: "600",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Profile Photo
          </label>

          <input
            type="file"
            name="image"
            onChange={handleChange}
          />
        </div>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
          />

          {/* COMPANY */}
          {role === "company" && (
            <>
              <input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="Company Name"
              />

              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="Website"
              />
            </>
          )}

          {/* FARMER */}
          {role === "farmer" && (
            <>
              <input
                name="farmType"
                value={form.farmType}
                onChange={handleChange}
                placeholder="Farm Type"
              />

              <input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Years of Experience"
              />
            </>
          )}

        </div>

        {/* BIO */}
        <div style={{ marginTop: "20px" }}>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder={
              role === "company"
                ? "Tell farmers about your company..."
                : "Tell companies about your farming business..."
            }
            rows="5"
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              fontSize: "15px",
              resize: "none",
            }}
          />
        </div>

        {/* STATS */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div className="stat-card" style={{ flex: 1 }}>
            <h2>24</h2>
            <p>Total Orders</p>
          </div>

          <div className="stat-card" style={{ flex: 1 }}>
            <h2>4.8⭐</h2>
            <p>Rating</p>
          </div>

          <div className="stat-card" style={{ flex: 1 }}>
            <h2>12</h2>
            <p>Connections</p>
          </div>
        </div>

        {/* BUTTON */}
        <button
          className="primary full"
          onClick={updateProfile}
          style={{
            marginTop: "30px",
            height: "50px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Save Profile
        </button>

      </div>
    </div>
  );
}

export default Profile;