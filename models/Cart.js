import mongoose, { Schema } from "mongoose";
const CartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId,ref:"users", required: true },
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
  },
  { timestamps: true }
);

export const carts = mongoose.model("Cart", CartSchema);
