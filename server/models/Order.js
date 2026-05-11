const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: String,
  productTitle: String,
  price: Number,
 quantity: String,

  farmerId: String,
  companyId: String,

  status: {
    type: String,
    default: "pending", // pending | accepted | rejected
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);