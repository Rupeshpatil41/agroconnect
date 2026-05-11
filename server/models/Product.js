// server/models/Product.js

const mongoose =
  require("mongoose");

const productSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      // ✅ NEW
      quantityUnit: {
        type: String,
        default: "kg",
      },

      farmerId: {
        type: String,
        required: true,
      },

      // MULTIPLE IMAGES
      images: [String],
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Product",
    productSchema
  );