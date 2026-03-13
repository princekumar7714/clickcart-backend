import express from "express";
import { createOrder, getOrders, getOrderById, cancelOrder } from "../controllers/orderController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, createOrder);
router.get("/", isAuthenticated, getOrders);
router.get("/:orderId", isAuthenticated, getOrderById);
router.patch("/:orderId/cancel", isAuthenticated, cancelOrder);

export default router;
