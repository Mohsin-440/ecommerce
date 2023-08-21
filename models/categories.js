import mongoose, { Schema } from "mongoose";
import { addImageToSchema } from "../helpers/mongooseValidator.js";






const categorySchema = new Schema(
  {
    categoryName: { type: String, unique: true, required: true },
    ...addImageToSchema("categoryImages")
  },
  { timestamps: true }
);


export const categories = mongoose.model("categories", categorySchema);

const subCategorySchema = new Schema(
  {
    subCategoryName: { type: String, required: true, unique: true },

    categoryId: { type: Schema.Types.ObjectId, ref: "categories", required: true },
    ...addImageToSchema()

  },
  { timestamps: true }
);

export const subCategories = mongoose.model("subCategory", subCategorySchema);
