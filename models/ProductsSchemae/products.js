import mongoose, { Schema } from "mongoose";
import { productData } from "./commonStructure.js";

const productSchema = new Schema(
    {
      categoryId: { type: Schema.Types.ObjectId, ref: "categories", required: true },
  
      title: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      ...productData,
    },
    { timestamps: true }
  );
  
  export const products = mongoose.model("product", productSchema);
  