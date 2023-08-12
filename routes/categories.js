import express from "express";
import {
  createCategory,
  updateCategory,
  createSubCategory,
  updateSubCategory,
} from "../controllers/categoryControllers/modifyCategories.js";
import {
  getAllCategories,
  getOneCategory,
  getAllCategoriesWithSubCategory,
} from "../controllers/categoryControllers/readCategories.js";
import { authorizeUser } from "../middleware/authorizeUser.js";
import {
  addCategoryValidator,
  updateCategoryValidator,
  addSubCategoryValidator,
  updateSubCategoryValidator,
} from "../middleware/apiValidator/category.validators/modifyCategories.validator.js";

const categoryRouter = express.Router();
//categories
categoryRouter.get("/", getOneCategory);
categoryRouter.get("/all", getAllCategories);

categoryRouter.post("/add", addCategoryValidator, createCategory);
categoryRouter.put("/update/:_id", updateCategoryValidator, updateCategory);

//categories and subcategories
categoryRouter.get("/all/subcategory", getAllCategoriesWithSubCategory);

//sub categories
categoryRouter.post(
  "/subcategory/add",
  addSubCategoryValidator,
  createSubCategory
);
categoryRouter.put(
  "/subcategory/update/:_id",
  updateSubCategoryValidator,
  updateSubCategory
);
export default categoryRouter;
