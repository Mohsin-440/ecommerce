import mongoose, { Schema } from "mongoose";

const variation = new Schema({
  size: { type: String, required: true },
  subVariation: [
    {
      price: { type: Number },
      color: {
        name: {
          type: String, required: true,
        },
        colorCode: {
          type: String, required: true,
        },
      },
      quantity: { type: Number, required: true },
      imgUrl: [{ type: String, required: true }]
    },
  ],
});
const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imgUrl: [{ type: String, required: true }],

    variations: { type: [variation], required: false },
    color: { type: String },
    price: { type: Number },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    quantity: { type: Number },
  },
  { timestamps: true }
);

export const products = mongoose.model("Product", ProductSchema);
