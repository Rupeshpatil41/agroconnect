// server/routes/message.js

const express =
  require("express");

const router =
  express.Router();

const Message =
  require("../models/Message");

const Notification =
  require("../models/Notification");

// =====================================
// GET ALL CHAT MESSAGES
// =====================================
router.get(
  "/messages/:senderId/:receiverId",

  async (req, res) => {

    try {

      const {
        senderId,
        receiverId,
      } = req.params;

      const messages =
        await Message.find({
          $or: [
            {
              senderId,
              receiverId,
            },

            {
              senderId:
                receiverId,

              receiverId:
                senderId,
            },
          ],
        }).sort({
          createdAt: 1,
        });

      res.json(
        messages
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Error loading messages",
      });
    }
  }
);

// =====================================
// SEND MESSAGE
// =====================================
router.post(
  "/messages",

  async (req, res) => {

    try {

      const {
        senderId,
        receiverId,
        message,
      } = req.body;

      // VALIDATION
      if (
        !senderId ||
        !receiverId ||
        !message
      ) {

        return res.status(400).json({
          message:
            "All fields required",
        });
      }

      // =====================================
      // SAVE MESSAGE
      // =====================================
      const newMessage =
        new Message({
          senderId,
          receiverId,
          message,
        });

      await newMessage.save();

      // =====================================
      // CREATE NOTIFICATION
      // =====================================
      const notification =
        new Notification({
          userId:
            receiverId,

          title:
            "💬 New Message",

          message:
            "You received a new message",

          type:
            "message",
        });

      await notification.save();

      // =====================================
      // SUCCESS RESPONSE
      // =====================================
      res.json({
        success: true,

        message:
          newMessage,
      });

    } catch (err) {

      console.log(
        "MESSAGE ERROR:",
        err
      );

      res.status(500).json({
        message:
          "Error sending message",
      });
    }
  }
);

module.exports =
  router;