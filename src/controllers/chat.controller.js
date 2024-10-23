import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Message from "../models/Message.model.js";
import Chat from "../models/Chat.model.js";
import User from "../models/User.model.js";

const addMessage = asyncHandler(async (req, res) => {
  const { message, senderId, receiverId } = req.body;
  if (!message || !senderId || !receiverId) {
    throw new ApiError(400, "All fields are required");
  }
  const newMessage = await Message.create({ message, senderId, receiverId });

  if (!newMessage) {
    throw new ApiError(500, "Failed to send message");
  }

  let chat = await Chat.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!chat) {
    chat = await Chat.create({
      participants: [senderId, receiverId],
      messages: [newMessage._id],
    });

    if (!chat) {
      throw new ApiError(500, "Failed to create new chat");
    }
  } else {
    chat.messages.push(newMessage._id);
    await chat.save();
  }

  res.status(201).json({ message: "Message sent successfully" });
});

const getAllMessages = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    throw new ApiError(400, "Missing required fields");
  }

  const chat = await Chat.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  res.status(200).json({ messages: chat.messages });
});

const getUserChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const chats = await Chat.find({
    participants: userId,
  }).populate("messages");

  if (!chats || chats.length === 0) {
    throw new ApiError(404, "No chats found");
  }

  const senderIdList = chats.flatMap((chat) =>
    chat.participants.filter((participant) => participant !== userId)
  );

  const users = await User.find({ _id: { $in: senderIdList } });

  res.status(200).json({ users });
});

export { addMessage, getAllMessages, getUserChat };
