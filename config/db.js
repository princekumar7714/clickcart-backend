import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const DB_OPTIONS = {
      dbName: process.env.DB_NAME || "clickcart",
    };

    await mongoose.connect(process.env.MONGO_URI, DB_OPTIONS);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;