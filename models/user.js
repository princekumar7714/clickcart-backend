import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  addresses: [{
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    type: {
      type: String,
      enum: ["home", "work"],
      default: "home"
    }
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  }]
}, {
  timestamps: true
});

export const UserModel = mongoose.model("User", userSchema);