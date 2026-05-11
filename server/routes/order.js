// server/routes/order.js

const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

const Notification = require("../models/Notification");

// =====================================
// PLACE ORDER
// =====================================
router.post(
  "/place-order",

  async (req, res) => {
    try {
      const {
        companyId,
        farmerId,

        productId,
        productTitle,

        quantity,
        price,
      } = req.body;

      const newOrder =
        new Order({
          companyId,
          farmerId,

          productId,
          productTitle,

          quantity,
          price,

          status: "Pending",
        });

      await newOrder.save();

      // NOTIFICATION
      const notification =
        new Notification({
          userId: farmerId,

          title:
            "📦 New Order",

          message: `You received an order for ${productTitle}`,

          type: "order",
        });

      await notification.save();

      res.json({
        success: true,
      });

    } catch (err) {
      console.log(
        "PLACE ORDER ERROR:",
        err
      );

      res.status(500).json({
        message:
          "Error placing order",
      });
    }
  }
);

// =====================================
// FARMER ORDERS
// =====================================
router.get(
  "/farmer-orders/:farmerId",

  async (req, res) => {
    try {
      const orders =
        await Order.find({
          farmerId:
            req.params.farmerId,
        }).sort({
          createdAt: -1,
        });

      res.json(orders);

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message:
          "Error loading orders",
      });
    }
  }
);

// =====================================
// COMPANY ORDERS
// =====================================
router.get(
  "/company-orders/:companyId",

  async (req, res) => {
    try {
      const orders =
        await Order.find({
          companyId:
            req.params.companyId,
        }).sort({
          createdAt: -1,
        });

      res.json(orders);

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message:
          "Error loading orders",
      });
    }
  }
);

// =====================================
// UPDATE ORDER STATUS
// =====================================
router.put(
  "/update-order/:id",

  async (req, res) => {
    try {
      const updatedOrder =
        await Order.findByIdAndUpdate(
          req.params.id,

          {
            status:
              req.body.status,
          },

          {
            new: true,
          }
        );

      // NOTIFICATION
      const notification =
        new Notification({
          userId:
            updatedOrder.companyId,

          title:
            "📦 Order Updated",

          message: `Your order status is now ${req.body.status}`,

          type: "order",
        });

      await notification.save();

      res.json(updatedOrder);

    } catch (err) {
      console.log(
        "UPDATE ORDER ERROR:",
        err
      );

      res.status(500).json({
        message:
          "Error updating order",
      });
    }
  }
);

module.exports = router;