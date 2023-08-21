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
  getCategoryImage,
} from "../controllers/categoryControllers/readCategories.js";
import { authorizeUser } from "../middleware/authorizeUser.js";
import {
  addCategoryValidator,
  updateCategoryValidator,
  addSubCategoryValidator,
  updateSubCategoryValidator,
} from "../middleware/apiValidator/category.validators/modifyCategories.validator.js";
import { categoryAddMulter, categoryUpdateMulter, subCategoriesMulter } from "../middleware/multer/categoriesMulter.js";
import { FormDataParser } from "../middleware/formDataParser.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const categoryRouter = express.Router();
//categories
categoryRouter.get("/", getOneCategory);
categoryRouter.get("/all", getAllCategories);

categoryRouter.post("/add", authenticateUser, authorizeUser(["admin"]), categoryAddMulter, FormDataParser, addCategoryValidator, createCategory);
categoryRouter.put("/update/:_id", authenticateUser, authorizeUser(["admin"]),categoryUpdateMulter, FormDataParser, updateCategoryValidator, updateCategory);


categoryRouter.get("/categoryImage/:categoryId/:imageId", getCategoryImage);



//categories and subcategories
categoryRouter.get("/all/subcategory", getAllCategoriesWithSubCategory);

//sub categories
categoryRouter.post(
  "/subcategory/add",
  subCategoriesMulter, FormDataParser,
  addSubCategoryValidator,
  createSubCategory
);

categoryRouter.put(
  "/subcategory/update/:_id",
  updateSubCategoryValidator,
  updateSubCategory
);
export default categoryRouter;
