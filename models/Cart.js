import mongoose, { Schema } from "mongoose";
const CartSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        prodcutId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

export const cart = mongoose.model("Cart", CartSchema);
