import express from "express";
import { createReview, getProductReviews, updateReview, deleteReview } from "../controllers/reviewController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, createReview);
router.get("/product/:productId", getProductReviews);
router.put("/:reviewId", isAuthenticated, updateReview);
router.delete("/:reviewId", isAuthenticated, deleteReview);

export default router;
