// server/models/User.js

const mongoose = require("mongoose");

const userSchema =
  new mongoose.Schema(
    {
      name: String,

      email: String,

      password: String,

      role: String,

      image: String,

      phone: String,

      address: String,

      companyName: String,

      bio: String,

      website: String,

      farmType: String,

      experience: String,
    },
    { timestamps: true }
  );

module.exports =
  mongoose.model(
    "User",
    userSchema
  );