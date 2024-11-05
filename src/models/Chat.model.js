import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: {
    type: Array,
    required: true,
    default: [],
  },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

export default mongoose.model("Chat", chatSchema);
