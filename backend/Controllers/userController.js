const express = require("express");
const asyncHandler = require("express-async-handler");
const generateRandomToken = require("../Config/generateToken");
const User = require("../Models/userModel");

const router = express.Router();

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please enter all the fields." });
  } else {
    const exists = await User.findOne({ email });

    if (exists) {
      res.status(400).json({ message: "User already exists." });
    } else {
      const user = await User.create({
        name,
        email,
        password,
        pic,
      });

      if (user) {
        const object = {
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
        };
        res.status(201).json(object);
        console.log(`New User Created: ${user}`);
      } else {
        res
          .status(400)
          .json({ message: "Couldn't create the desired user :/" });
      }
    }
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateRandomToken(user._id);
    const object = {
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: token,
    };
    res.status(201).json(object);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const allUsers = async (req, res) => {
  const keyWord = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyWord).find({ _id: { $ne: req.user._id } });
  res.send(users);
};

module.exports = { allUsers, registerUser, authUser };
