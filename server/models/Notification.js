// server/models/Notification.js

const mongoose = require("mongoose");

const notificationSchema =
  new mongoose.Schema(
    {
      userId: String,

      title: String,

      message: String,

      type: String,

      isRead: {
        type: Boolean,
        default: false,
      },
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.models.Notification ||
  mongoose.model(
    "Notification",
    notificationSchema
  );