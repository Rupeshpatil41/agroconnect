const express =
  require("express");

const router =
  express.Router();

const bcrypt =
  require("bcryptjs");

const User =
  require("../models/User");

// =====================================
// REGISTER
// =====================================
router.post(
  "/register",

  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        role,
      } = req.body;

      // CHECK USER
      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {
        return res
          .status(400)
          .json({
            message:
              "User already exists",
          });
      }

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // CREATE USER
      const user =
        new User({
          name,
          email,
          password:
            hashedPassword,
          role,
        });

      await user.save();

      res.json({
        message:
          "Registered Successfully",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Register Error",
      });
    }
  }
);

// =====================================
// LOGIN
// =====================================
router.post(
  "/login",

  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // CHECK USER
      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res
          .status(400)
          .json({
            message:
              "User not found",
          });
      }

      // CHECK PASSWORD
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res
          .status(400)
          .json({
            message:
              "Invalid password",
          });
      }

      // SUCCESS
      res.json(user);

    } catch (err) {

      console.log(
        "LOGIN ERROR:",
        err
      );

      res.status(500).json({
        message:
          "Login Failed",
      });
    }
  }
);

// =====================================
// GET ALL USERS
// =====================================
router.get(
  "/all-users",

  async (req, res) => {

    try {

      const users =
        await User.find(
          {},
          "-password"
        );

      res.json(users);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Failed to fetch users",
      });
    }
  }
);

module.exports =
  router;