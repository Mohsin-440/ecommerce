import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto-js";
import { user } from "../../models/User.js";

const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = crypto.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET_KEY
    ).toString();
    console.log(req.body.password);
  }
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been Deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneUser = async (req, res) => {
  try {
    const getUser = await user.findById(req.params.id);
    const { password, ...other } = getUser._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const getAllUser = query
      ? await user.find().sort({ _id: -1 }).limit(5)
      : await user.find();
    res.status(200).json(getAllUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { updateUser, deleteUser, getOneUser, getAllUsers };
