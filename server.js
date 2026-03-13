import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

// Load environment variables first
dotenv.config();

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

// CORS configuration for Vercel
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-app-url.vercel.app'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use("/api", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Default route
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "ClickCart Backend API",
    version: "1.0.0",
    endpoints: {
      products: "/api",
      auth: "/api/auth",
      cart: "/api/cart",
      orders: "/api/orders",
      reviews: "/api/reviews",
      wishlist: "/api/wishlist"
    }
  });
});

// For Vercel deployment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);    
  });
}

// For Render deployment
if (process.env.RENDER || process.env.NODE_ENV === 'production') {
  app.listen(PORT || 10000, () => {
    console.log(`Server is running on port ${PORT || 10000}`);    
  });
}

export default app;