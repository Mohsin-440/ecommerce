import mongoose, { Schema } from "mongoose";
import { productData } from "./commonStructure.js";

const subVariation = new Schema({
    variationId: { type: Schema.Types.ObjectId, ref: "variations", required: true },
    ...productData
  })
  
  export const productSubVariations = mongoose.model("subVariation", subVariation);