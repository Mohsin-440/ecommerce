import express from "express";
import { addToCart } from "../controllers/cartControllers/modifyCart.js";
import { getFullCart } from "../controllers/cartControllers/readCarts.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/full",getFullCart);

export default router;
