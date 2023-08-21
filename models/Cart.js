import mongoose, { Schema } from "mongoose";


const CartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId,ref:"users", required: true },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true
        },
        variationId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required:true
        },
        subVariationId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required:true
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