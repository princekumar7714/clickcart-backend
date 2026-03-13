import express from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, addToWishlist);
router.get("/", isAuthenticated, getWishlist);
router.delete("/:productId", isAuthenticated, removeFromWishlist);

export default router;
