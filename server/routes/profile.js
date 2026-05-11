const express =
  require("express");

const router =
  express.Router();

const User =
  require("../models/User");

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

  async (req, res) => {

    try {

      const updatedUser =
        await User.findByIdAndUpdate(
          req.params.id,

          req.body,

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