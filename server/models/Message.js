// server/models/Message.js

const mongoose = require("mongoose");

// ======================================
// MESSAGE SCHEMA
// ======================================
const messageSchema =
  new mongoose.Schema(
    {
      // SENDER USER ID
      senderId: {
        type: String,
        required: true,
      },

      // RECEIVER USER ID
      receiverId: {
        type: String,
        required: true,
      },

      // MESSAGE TEXT
      message: {
        type: String,
        required: true,
      },
    },

    // AUTO CREATED AT
    {
      timestamps: true,
    }
  );

// ======================================
// EXPORT MODEL
// ======================================
module.exports =
  mongoose.model(
    "Message",
    messageSchema
  );