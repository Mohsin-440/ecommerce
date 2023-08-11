import crypto from "crypto-js";
import jwt from "jsonwebtoken";
import { user } from "../../models/User.js";
import { Types } from "mongoose";

const registerController = async (req, res) => {
  try {
    const _id = new Types.ObjectId();
    const username =
      req.body.firstName + req.body.lastName + _id.toString().substring(0, 6);

    const password = crypto.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET_KEY
    ).toString();

    const newUser = new user({
      ...req.body,
      _id,
      username,
      password,
    
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginController = async (req, res) => {
  try {
    const getUser = await user.findOne({ email: req.body.email });

    if (!getUser) {
      return res.status(404).send("Wrong credentials! ");
    }

    const hashedPassword = crypto.AES.decrypt(
      getUser.password,
      process.env.PASS_SECRET_KEY
    );

    const originalPassword = hashedPassword.toString(crypto.enc.Utf8);
    console.log({
      hashedPassword,
      originalPassword,
      password: req.body.password,
    });

    if (originalPassword === req.body.password) {
      const { password, ...other } = getUser._doc;

      const accessToken = jwt.sign(
        {
          id: getUser._id,
          isAdmin: getUser.role,
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
};

export { registerController, loginController };
