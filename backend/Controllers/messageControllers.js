const expressAsyncHandler = require("express-async-handler");
const Message = require("../Models/MessageModel");

const asyncHandler = require(expressAsyncHandler);

const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content } = req.body;
  if (!content || !chatId) {
    return res.status(400).send({
      error: "Content and chatID are required",
    });
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await User.populate(message, {
      path: "chat.Users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    response.json(message);
  } catch (error) {
    res.status(400);
    throw new Error("Could not create the message");
  }
});

module.exports = { sendMessage };
