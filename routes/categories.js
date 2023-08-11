import express from "express";
import { createCategory } from "../controllers/categoryControllers/modifyCategories.js";
import { getAllCategories, getOneCategory } from "../controllers/categoryControllers/readCategories.js";
import { authorizeUser } from "../middleware/authorizeUser.js";

const categoryRouter = express.Router();

categoryRouter.post("/add", createCategory);
categoryRouter.get("/", getOneCategory);
categoryRouter.get("/", getOneCategory);
categoryRouter.get("/all",getAllCategories);
export default categoryRouter;
