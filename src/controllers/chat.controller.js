import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Message from "../models/Message.model.js";
import Chat from "../models/Chat.model.js";

const addMessage = asyncHandler(async (req, res) => {
  const { message, senderId, receivedId } = req.body;
  if (!message || !senderId || !receivedId) {
    throw new ApiError(400, "Please fill all the fields");
  }
  const newMessage = await Message.create({
    message,
    senderId,
    receivedId,
  });
  if (!newMessage) {
    throw new ApiError(500, "Something went wrong while adding the message");
  }
  const chat = await Chat.findOne({
    participants: { $all: [senderId, receivedId] },
  });
  if (!chat) {
    const newChat = await Chat.create({
      participants: [senderId, receivedId],
      messages: [newMessage._id],
    });
    if (!newChat) {
      throw new ApiError(
        500,
        "Something went wrong while adding the message to the chat"
      );
    }
  } else {
    chat.messages.push(newMessage._id);
    await chat.save();
  }
  res.status(201).json({ message: "Message sent successfully" });
});
const getAllMessages = asyncHandler(async (req, res) => {
  const { senderId, receivedId } = req.body;

  if (!senderId || !receivedId) {
    throw new ApiError(400, "Error in fetching messages");
  }

  const chat = await Chat.findOne({
    participants: { $all: [senderId, receivedId] },
  }).populate("messages");

  if (!chat) {
    throw new ApiError(404, "No chat found");
  }

  res.status(200).json({ messages: chat.messages });
});

const getUserChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(400, "Error in fetching chats");
  }

  const chat = await Chat.find({
    participants: userId,
  }).populate("messages");

  if (!chat) {
    throw new ApiError(404, "No chat found");
  }
  res.status(200).json({ chat });
});

export { addMessage, getAllMessages, getUserChat };
