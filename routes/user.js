import express from "express";
import {
  updateUser,
  deleteUser,
  getOneUser,
  getAllUsers,
} from "../controllers/userControllers/crudUser.js";

const userRouter = express.Router();

userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/find/:id", getOneUser);
userRouter.get("/", getAllUsers);

export default userRouter;
