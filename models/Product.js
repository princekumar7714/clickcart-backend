import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  stock: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  brand: {
    type: String,
    default: ""
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },

  numReviews: {
    type: Number,
    default: 0
  }

});

export const ProductModel = mongoose.model("Product", productSchema);