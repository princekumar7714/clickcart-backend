import express from "express";
import { addToCart, getCart, updateCartItem, removeFromCart } from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, addToCart);
router.get("/", isAuthenticated, getCart);
router.put("/", isAuthenticated, updateCartItem);
router.delete("/:productId", isAuthenticated, removeFromCart);

export default router;
