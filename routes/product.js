import express from "express";
import {
  createProduct,
  deleteProduct,
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


// addProductValidator,

productRouter.post("/add",addProductValidator, createProduct);
productRouter.put("/update/:_id", updateProductValidator, updateProduct);
productRouter.delete("/:_id", deleteProduct);
productRouter.get("/:_id", getOneProduct);
productRouter.get("/", searchProducts);

export default productRouter;
