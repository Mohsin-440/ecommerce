import cryptoJs from "crypto-js";
import { user } from "../../models/User.js";
export const register = async (req, res) => {
  console.log(process.env.SECRET_KEY)
  try {
    const newUser = new user({
      username: req.body.username,
      email: req.body.email,
      password: cryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });
    const savedUser = await newUser.save();
    console.log(savedUser)
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};
