const express =
  require("express");

const router =
  express.Router();

const multer =
  require("multer");

const path =
  require("path");

const User =
  require("../models/User");

// =====================================
// MULTER STORAGE
// =====================================
const storage =
  multer.diskStorage({

    destination:
      function (
        req,
        file,
        cb
      ) {

        cb(
          null,
          "uploads/"
        );
      },

    filename:
      function (
        req,
        file,
        cb
      ) {

        cb(
          null,

          Date.now() +
            "-" +
            file.originalname
        );
      },
  });

const upload =
  multer({
    storage,
  });

// =====================================
// GET USER PROFILE
// =====================================
router.get(
  "/profile/:id",

  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      res.json(user);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Error loading profile",
      });
    }
  }
);

// =====================================
// UPDATE PROFILE
// =====================================
router.put(
  "/profile/:id",

  upload.single(
    "profilePic"
  ),

  async (req, res) => {

    try {

      const updateData = {
        name:
          req.body.name,

        email:
          req.body.email,

        role:
          req.body.role,
      };

      // SAVE IMAGE
      if (
        req.file
      ) {

        updateData.profilePic =
          `uploads/${req.file.filename}`;
      }

      const updatedUser =
        await User.findByIdAndUpdate(

          req.params.id,

          updateData,

          {
            new: true,
          }
        );

      res.json(
        updatedUser
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Error updating profile",
      });
    }
  }
);

module.exports =
  router;