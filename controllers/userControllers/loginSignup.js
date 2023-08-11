import crypto from "crypto-js";
import { users } from "../../models/User.js";
import { Types } from "mongoose";
import { setCookies } from "../../helpers/cookieSetter.js";

const registerController = async (req, res) => {
  try {
    const _id = new Types.ObjectId();
    const username = req.body.firstName + req.body.lastName + _id.toString().substring(0, 6);

    const checkEmail = await users.findOne({
      email: req.body.email
    })
    if (checkEmail)
      return res.status(403).json({ error: { email: "email already in use" } });

    const password = crypto.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET_KEY
    ).toString();

    const newUser = new users({
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
    const getUser = await users.findOne({ email: req.body.email });

    if (!getUser)
      return res.status(404).send("Wrong credentials! ");


    const hashedPassword = crypto.AES.decrypt(
      getUser.password,
      process.env.PASS_SECRET_KEY
    );

    const originalPassword = hashedPassword.toString(crypto.enc.Utf8);

    if (originalPassword !== req.body.password)
      return res.status(401).send("Wrong credentials! ");

    const { password, ...other } = getUser._doc;

    await setCookies(getUser, res);

    return res.status(200).json({ ...other });
  } catch (error) {
    console.log(error)
    return res.status(500).send("Server error");
  }
};

export { registerController, loginController };
