import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
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
    amount: { type: Number, required: true },
    fullAddress: {
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      houseNo: { type: String },
      streetAddress: { type: String, required: true },
    },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const order = mongoose.model("Order", orderSchema);
