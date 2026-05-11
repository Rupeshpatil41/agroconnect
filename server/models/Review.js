// server/models/Review.js

const mongoose = require("mongoose");

// =====================================
// REVIEW SCHEMA
// =====================================
const reviewSchema =
  new mongoose.Schema(
    {
      reviewerId: {
        type: String,
      },

      targetUserId: {
        type: String,
      },

      orderId: {
        type: String,
      },

      rating: {
        type: Number,
      },

      review: {
        type: String,
      },

      reviewerName: {
        type: String,
      },

      reviewerImage: {
        type: String,
      },
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.models.Review ||
  mongoose.model(
    "Review",
    reviewSchema
  );