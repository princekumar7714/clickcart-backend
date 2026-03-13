import { WishlistModel } from "../models/Wishlist.js";

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    let wishlist = await WishlistModel.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await WishlistModel.create({
        user: userId,
        items: [{ product: productId }]
      });
    } else {
      const existingItem = wishlist.items.find(
        item => item.product.toString() === productId
      );

      if (existingItem) {
        return res.status(400).json({
          success: false,
          message: "Product already in wishlist"
        });
      }

      wishlist.items.push({ product: productId });
      await wishlist.save();
    }

    await wishlist.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add to wishlist",
      error: error.message
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const wishlist = await WishlistModel.findOne({ user: userId })
      .populate("items.product");

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        wishlist: { items: [] }
      });
    }

    res.status(200).json({
      success: true,
      wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get wishlist",
      error: error.message
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const wishlist = await WishlistModel.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found"
      });
    }

    wishlist.items = wishlist.items.filter(
      item => item.product.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Item removed from wishlist",
      wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove from wishlist",
      error: error.message
    });
  }
};
