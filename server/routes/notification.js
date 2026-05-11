const express =
  require("express");

const router =
  express.Router();

const Notification =
  require("../models/Notification");

// =====================================
// GET NOTIFICATIONS
// =====================================
router.get(
  "/notifications/:userId",

  async (req, res) => {

    try {

      const notifications =
        await Notification.find({
          userId:
            req.params.userId,

          isRead: false,
        }).sort({
          createdAt: -1,
        });

      res.json(
        notifications
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Error fetching notifications",
      });
    }
  }
);

// =====================================
// MARK NOTIFICATION AS READ
// =====================================
router.put(
  "/mark-notification/:id",

  async (req, res) => {

    try {

      console.log(
        "MARK ROUTE WORKING"
      );

      const updated =
        await Notification.findByIdAndUpdate(
          req.params.id,

          {
            isRead: true,
          },

          {
  returnDocument: "after",
}
        );

      res.json({
        success: true,
        updated,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Error updating notification",
      });
    }
  }
);

module.exports =
  router;