import express from "express";
import {
  createProduct,
  updateProduct,
} from "../controllers/productControllers/modifyProduct.js";
import {
  getOneProduct,
  searchProducts,
} from "../controllers/productControllers/readProduct.js";
import { authorizeUser } from "../middleware/authorizeUser.js";
import {
  addProductValidator,
  updateProductValidator,
} from "../middleware/apiValidator/product.validators/modifyProduct.validators.js";
const productRouter = express.Router();
// productRouter.get("/",);
productRouter.post("/add", addProductValidator, createProduct);
productRouter.get("/:_id", getOneProduct);
productRouter.put("/:_id", updateProductValidator, updateProduct);
productRouter.get("/", searchProducts);

export default productRouter;
