import mongoose, { Schema } from "mongoose";
import { productData } from "./commonStructure.js";

const variation = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
    size: { type: String, required: true },
    ...productData
});


export const productVariations = mongoose.model("variation", variation);