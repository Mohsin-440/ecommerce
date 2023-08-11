import express from "express";
import { authorizeAdmin } from "../middleware/authorizeUser/authorizeAdmin.js";

const productRouter = express.Router();
// productRouter.get("/",);
authorizeAdmin
productRouter.post("/add",);


export default productRouter;
