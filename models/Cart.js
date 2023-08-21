import mongoose, { Schema } from "mongoose";


const CartSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true
        },
        variationId: {
          type: String,
          ref: "products.variations",
          required: true
        },
        subVariationId: {
          type: String,
          ref: "products.variations.subVariations",
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
          required: true
        },
      },
    ],
  },
  { timestamps: true }
);

export const carts = mongoose.model("Cart", CartSchema);

const a = [
  {
    "$lookup": {
      "from": "products",
      "as": "cartProducts",
      "let": {
        "cartProductId": "prodcutId"
      },
      "pipeline": [
        {
          $unwind: "$variations"
        },
        {
          $unwind: "$variations.subVariations"
        },
        {
          $match: {
            $exec: {
              _id: "$$cartProductId"
            }
          }
        }
      ]
    }
  }
]