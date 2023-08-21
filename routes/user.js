import express from "express";
import {
  updateUser,
  deleteUser,
  getOneUser,
  getAllUsers,
} from "../controllers/userControllers/crudUser.js";
import { loginController, registerController } from "../controllers/userControllers/loginSignup.js";
import { signUpValidator } from "../middleware/apiValidator/register.validator.js";
import { loginValidator } from "../middleware/apiValidator/login.validator.js";
import { updateUsersValidator } from "../middleware/apiValidator/users.validators/modifyUsers.validators.js";

const userRouter = express.Router();

userRouter.post("/register", signUpValidator, registerController);
userRouter.post("/login", loginValidator,  loginController);

userRouter.put("/update/:id",updateUsersValidator, updateUser);

userRouter.delete("/:id", deleteUser);

userRouter.get("/:id", getOneUser);
userRouter.get("/", getAllUsers);

export default userRouter;
