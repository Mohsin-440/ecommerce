import express from "express";
import { addToCart, updateCart } from "../controllers/cartControllers/modifyCart.js";
import { getFullCart } from "../controllers/cartControllers/readCarts.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/full",getFullCart);
cartRouter.put("/update/:_id",updateCart);

export default cartRouter;
