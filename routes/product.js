import express from "express";

import { authorizeUser } from "../middleware/authorizeUser.js";
import { authenticateUser } from "../middleware/authenticateUser.js";


//api validators 
import {
  addProductValidator,
  updateProductValidator,
} from "../middleware/apiValidator/product.validators/modifyProduct.validators.js";


//controllers
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productControllers/modifyProduct.js";
import {
  getOneProduct,
  searchProducts,
} from "../controllers/productControllers/readProduct.js";



const productRouter = express.Router();


// addProductValidator,

productRouter.post("/add",authenticateUser,authorizeUser(["admin"]),addProductValidator, createProduct);
productRouter.put("/update/:_id",authenticateUser,authorizeUser(["admin"]), updateProductValidator, updateProduct);
productRouter.delete("/:_id", authenticateUser,authorizeUser(["admin"]),deleteProduct);
productRouter.get("/:_id", getOneProduct);
productRouter.get("/", searchProducts);

export default productRouter;
