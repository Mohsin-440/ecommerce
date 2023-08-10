import express from "express";
import { check } from "../controllers/check/chec.js";

const userRouter = express.Router();

userRouter.get("/", check);

export default userRouter;
