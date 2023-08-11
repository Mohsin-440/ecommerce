import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "employee", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

export const users = mongoose.model("User", UserSchema);
