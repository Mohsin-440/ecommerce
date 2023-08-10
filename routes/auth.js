const dotenv = require("dotenv");
const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

dotenv.config();

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  //user not found error
  if (!user) {
    return res.status(404).send("Wrong credentials! ");
  }
  //Decrypting the user password from the database
  const hashedPassword = CryptoJs.AES.decrypt(
    user.password,
    process.env.PASS_SECRET_KEY
  );
  const originalPassword = await hashedPassword.toString(CryptoJs.enc.Utf8);
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
      return res.status(200).json({...other,accessToken});
    } else {
      return res.status(401).send("Wrong credentials! ");
    }
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

module.exports = router;
