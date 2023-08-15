import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, required: true,ref:"users" },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required:true
        },
        variationId: {
          type:  Schema.Types.ObjectId,
          ref: "products.variations",
          required:true
        },
        subVariationId: {
          type:  Schema.Types.ObjectId,
          ref: "products.variations.subVariations",
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

export const orders = mongoose.model("Order", orderSchema);
