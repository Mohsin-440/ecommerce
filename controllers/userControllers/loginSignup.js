import { users } from "../../models/User.js";
import { Types } from "mongoose";
import { setCookies } from "../../helpers/cookieSetter.js";
import { hashPassword } from "../../helpers/hashPassword.js";

const registerController = async (req, res) => {
  try {
    
    const _id = new Types.ObjectId();
    const username =
      req.body.firstName + req.body.lastName + _id.toString().substring(0, 6);

    const checkEmail = await users.findOne({
      email: req.body.email,
    });
    if (checkEmail)
      return res.status(403).json({ error: { email: "email already in use" } });
    const hasedPassword = hashPassword(req.body.password);

    req.body.role = "admin";
    const newUser = new users({
      ...req.body,
      _id,
      username,
      password: hasedPassword,
    });
    const savedUser = await newUser.save();
    delete savedUser._doc.password;
    res.status(201).json(savedUser._doc);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginController = async (req, res) => {
  try {
    const getUser = await users.findOne({ email: req.body.email });

    if (!getUser) return res.status(404).send("Wrong credentials! ");

    const hashedPassword = hashPassword(req.body.password);

    if (getUser.password !== hashedPassword)
      return res.status(401).send("Wrong credentials! ");

    const { password, ...other } = getUser._doc;

    await setCookies(getUser, res);

    return res.status(200).json({ ...other });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export { registerController, loginController };
