// server/routes/product.js

const express =
  require("express");

const router =
  express.Router();

const multer =
  require("multer");

const path =
  require("path");

const Product =
  require("../models/Product");

// =====================================
// MULTER STORAGE
// =====================================
const storage =
  multer.diskStorage({
    destination:
      function (
        req,
        file,
        cb
      ) {

        cb(
          null,
          "uploads/"
        );
      },

    filename:
      function (
        req,
        file,
        cb
      ) {

        cb(
          null,

          Date.now() +
            "-" +
            file.originalname
        );
      },
  });

const upload =
  multer({
    storage,
  });

// =====================================
// ADD PRODUCT
// =====================================
router.post(
  "/add-product",

  upload.array(
    "images",
    5
  ),

  async (req, res) => {

    try {

      const imageNames =
        req.files.map(
          (file) =>
            file.filename
        );

      const product =
        new Product({
          title:
            req.body.title,

          price:
            req.body.price,

          quantity:
            req.body.quantity,

          // ✅ NEW
          quantityUnit:
            req.body.quantityUnit,

          farmerId:
            req.body.farmerId,

          images:
            imageNames,
        });

      await product.save();

      res.json({
        message:
          "Product Added Successfully",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Error adding product",
      });
    }
  }
);

// =====================================
// GET PRODUCTS
// =====================================
router.get(
  "/products",

  async (req, res) => {

    try {

      const products =
        await Product.find().sort({
          createdAt: -1,
        });

      res.json(
        products
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Error fetching products",
      });
    }
  }
);

// =====================================
// GET SINGLE PRODUCT
// =====================================
router.get(
  "/product/:id",

  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      res.json(product);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Error fetching product",
      });
    }
  }
);

module.exports =
  router;