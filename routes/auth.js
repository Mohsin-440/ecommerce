import express from "express";
import { signUpValidator } from "../middleware/apiValidator/register.validator.js";
import { loginValidator } from "../middleware/apiValidator/login.validator.js";
import {
  registerController,
  loginController,
} from "../controllers/userControllers/loginSignup.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

//SignUP
router.post("/register", signUpValidator, registerController);

// Login
router.post("/login", loginValidator, authenticateUser, loginController);

export default router;
