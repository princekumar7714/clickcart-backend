import { OrderModel } from "../models/Order.js";
import { CartModel } from "../models/Cart.js";
import { ProductModel } from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const userId = req.user.id;

    const cart = await CartModel.findOne({ user: userId }).populate("items.product");
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = await ProductModel.findById(item.product._id);
      
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }

      totalAmount += product.price * item.quantity;
      orderItems.push({
        product: item.product._id,
        quantity: item.quantity,
        price: product.price
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

    const order = await OrderModel.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      estimatedDelivery
    });

    await CartModel.findOneAndDelete({ user: userId });

    await order.populate("items.product");

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const orders = await OrderModel.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: error.message
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await OrderModel.findOne({ 
      _id: orderId, 
      user: userId 
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get order",
      error: error.message
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await OrderModel.findOne({ 
      _id: orderId, 
      user: userId 
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    if (order.orderStatus === "shipped" || order.orderStatus === "delivered") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel shipped or delivered order"
      });
    }

    order.orderStatus = "cancelled";

    for (const item of order.items) {
      const product = await ProductModel.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: error.message
    });
  }
};
