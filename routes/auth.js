import { config } from "dotenv";
import { user } from "../models/User.js";
import crypto from "crypto-js";
import jwt from "jsonwebtoken";
import { signUpValidator } from "../middleware/apiValidator/apiValidator.js";
import express from "express";
import { register } from "../controllers/userControllers/loginSignup.js";

const router = express.Router();

config();

//SignUP
const { AES, enc } = crypto;
router.post("/register",register);

// Login
router.post("/login", async (req, res) => {
  const user = await user.findOne({ username: req.body.username });

  //user not found error
  if (!user) {
    return res.status(404).send("Wrong credentials! ");
  }
  //Decrypting the user password from the database
  const hashedPassword = AES.decrypt(
    user.password,
    process.env.PASS_SECRET_KEY
  );
  const originalPassword = await hashedPassword.toString(enc.Utf8);
  //Compare the Decrypted Password with the password that user enter
  try {
    if (originalPassword === req.body.password) {
      const { password, ...other } = user._doc;
      //jsonWebToken signing
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "3d" }
      );
      return res.status(200).json({ ...other, accessToken });
    } else {
      return res.status(401).send("Wrong credentials! ");
    }
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

export default router;
