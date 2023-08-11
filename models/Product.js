import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true },

    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
  },
  { timestamps: true }
);

export const products = mongoose.model("Product", ProductSchema);
