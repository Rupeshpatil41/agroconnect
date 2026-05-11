// server/routes/review.js

const express = require("express");

const router = express.Router();

const Review = require("../models/Review");

const Notification = require("../models/Notification");

// =====================================
// ADD REVIEW
// =====================================
router.post(
  "/add-review",

  async (req, res) => {
    try {
      const reviewData = {
        reviewerId:
          req.body.reviewerId,

        targetUserId:
          req.body.targetUserId,

        orderId:
          req.body.orderId,

        rating:
          Number(req.body.rating),

        review:
          req.body.review,

        reviewerName:
          req.body.reviewerName,

        reviewerImage:
          req.body.reviewerImage,
      };

      const newReview =
        new Review(reviewData);

      await newReview.save();

      // =====================================
      // CREATE NOTIFICATION
      // =====================================
      const notification =
        new Notification({
          userId:
            req.body.targetUserId,

          title:
            "⭐ New Review",

          message: `You received a ${req.body.rating}-star review`,

          type: "review",
        });

      await notification.save();

      res.json({
        success: true,

        message:
          "Review Added Successfully",
      });

    } catch (err) {
      console.log(
        "ADD REVIEW ERROR:",
        err
      );

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  }
);

// =====================================
// GET REVIEWS
// =====================================
router.get(
  "/reviews/:userId",

  async (req, res) => {
    try {
      const reviews =
        await Review.find({
          targetUserId:
            req.params.userId,
        }).sort({
          createdAt: -1,
        });

      res.json(reviews);

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message:
          "Error fetching reviews",
      });
    }
  }
);

module.exports = router;