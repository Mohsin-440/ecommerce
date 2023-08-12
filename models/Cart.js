import mongoose, { Schema } from "mongoose";
const CartSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        prodcutId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required:true
        },
        quantity: {
          type: Number,
          default: 1,
          required:true
        },
      },
    ],
  },
  { timestamps: true }
);

export const carts = mongoose.model("Cart", CartSchema);
