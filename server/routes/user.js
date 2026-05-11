// server/routes/user.js

const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const User = require("../models/User");

// ======================================
// MULTER STORAGE
// ======================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// ======================================
// GET ALL USERS
// ======================================
router.get(
  "/all-users",
  async (req, res) => {
    try {
      const users =
        await User.find().select(
          "-password"
        );

      res.json(users);

    } catch (err) {
      console.log(
        "ALL USERS ERROR:",
        err
      );

      res.status(500).json({
        message:
          "Error fetching users",
      });
    }
  }
);

// ======================================
// GET SINGLE PROFILE
// ======================================
router.get(
  "/profile/:id",
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        ).select("-password");

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      res.json(user);

    } catch (err) {
      console.log(
        "GET PROFILE ERROR:",
        err
      );

      res.status(500).json({
        message:
          "Error fetching profile",
      });
    }
  }
);

// ======================================
// UPDATE PROFILE
// ======================================
router.put(
  "/profile/:id",
  upload.single("image"),

  async (req, res) => {
    try {
      const updateData = {
        name: req.body.name || "",
        email: req.body.email || "",

        phone:
          req.body.phone || "",

        address:
          req.body.address || "",

        companyName:
          req.body.companyName ||
          "",

        bio: req.body.bio || "",

        website:
          req.body.website || "",

        farmType:
          req.body.farmType || "",

        experience:
          req.body.experience ||
          "",
      };

      // IMAGE
      if (req.file) {
        updateData.image =
          `http://localhost:5000/uploads/${req.file.filename}`;
      }

      const updatedUser =
        await User.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true }
        ).select("-password");

      res.json(updatedUser);

    } catch (err) {
      console.log(
        "UPDATE PROFILE ERROR:",
        err
      );

      res.status(500).json({
        message:
          "Error updating profile",
      });
    }
  }
);

module.exports = router;