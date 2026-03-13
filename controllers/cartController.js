import { CartModel } from "../models/Cart.js";
import { ProductModel } from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock"
      });
    }

    let cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      cart = await CartModel.create({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add to cart",
      error: error.message
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const cart = await CartModel.findOne({ user: userId })
      .populate("items.product");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { items: [] }
      });
    }

    res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get cart",
      error: error.message
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart"
      });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      const product = await ProductModel.findById(productId);
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock"
        });
      }
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update cart",
      error: error.message
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove from cart",
      error: error.message
    });
  }
};
