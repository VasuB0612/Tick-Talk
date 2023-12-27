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

const CreateGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json({ msg: "Please provide all the details." });
  }

  var users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res
      .status(400)
      .json({ msg: "You need to have atleast three members in group chat." });
  }
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (err) {
    res.status(400).json("Something went wrong.");
  }
});

const renameGroupChat = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    { _id: chatId },
    { $set: { chatName } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    return res.status(401).json({ msg: "No such Group Found" });
  } else {
    res.status(200).json(updatedChat);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatID, userID } = req.body;
  const added = await Chat.findByIdAndUpdate(
    chatID,
    { $push: { users: userID } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    return res
      .status(401)
      .json({ msg: "User not found or already a member of the group" });
  } else {
    res.status(200).json(added);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatID, userID } = req.body;
  const removed = await Chat.findByIdAndUpdate(
    chatID,
    { $pull: { users: userID } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    return res.status(401).json({ msg: "User is not in this group" });
  } else {
    res.status(200).json(removed);
  }
});

module.exports = {
  accesChat,
  fetchChat,
  CreateGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
};
