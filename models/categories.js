import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

export const categories = mongoose.model("categories", categorySchema);

const subCategorySchema = new Schema(
  {
    subCategoryName: { type: String, required: true },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
  },
  { timestamps: true }
);

export const subCategories = mongoose.model("subCategory", subCategorySchema);
