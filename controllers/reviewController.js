import { ReviewModel } from "../models/Review.js";
import { ProductModel } from "../models/Product.js";

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment, title } = req.body;
    const userId = req.user.id;

    // Check if user already reviewed this product
    const existingReview = await ReviewModel.findOne({
      user: userId,
      product: productId
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product"
      });
    }

    // Create new review
    const review = await ReviewModel.create({
      user: userId,
      product: productId,
      rating,
      comment,
      title
    });

    await review.populate("user", "name");

    // Update product rating and review count
    const allReviews = await ReviewModel.find({ product: productId });
    const totalRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0);
    const avgRating = totalRating / allReviews.length;

    await ProductModel.findByIdAndUpdate(productId, {
      rating: avgRating,
      numReviews: allReviews.length
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message
    });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ReviewModel.find({ product: productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get reviews",
      error: error.message
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment, title } = req.body;
    const userId = req.user.id;

    const review = await ReviewModel.findOne({
      _id: reviewId,
      user: userId
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    review.title = title || review.title;

    await review.save();

    // Update product rating
    const allReviews = await ReviewModel.find({ product: review.product });
    const totalRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0);
    const avgRating = totalRating / allReviews.length;

    await ProductModel.findByIdAndUpdate(review.product, {
      rating: avgRating,
      numReviews: allReviews.length
    });

    await review.populate("user", "name");

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update review",
      error: error.message
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await ReviewModel.findOne({
      _id: reviewId,
      user: userId
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    const productId = review.product;
    await review.deleteOne();

    // Update product rating
    const allReviews = await ReviewModel.find({ product: productId });
    const totalRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0);
    const avgRating = allReviews.length > 0 ? totalRating / allReviews.length : 0;

    await ProductModel.findByIdAndUpdate(productId, {
      rating: avgRating,
      numReviews: allReviews.length
    });

    res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message
    });
  }
};
