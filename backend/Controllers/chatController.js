const express = require("express");
const asyncHandler = require("express-async-handler");
const generateRandomToken = require("../Config/generateToken");
const Chat = require("../Models/ChatModels");
const User = require("../Models/userModel");

const accesChat = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  if (!userID) {
    console.log("UserID not sent with request.");
    res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGrouChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userID } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGrouChat: false,
      users: [req.user._id, userID],
    };
    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(result);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { accesChat, fetchChat };
