const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    quantity: {
      required: true,
      type: Number,
    },
    category: {
      required: true,
      type: String,
    },
    color: {
      required: true,
      type: String,
    },
    size: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    shipping: {
      type: Boolean,
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model('product', productSchema);

module.exports = Product;
