import mongoose from "mongoose";

const ConversationChannelSchema = new mongoose.Schema({
  subscribers: {
    type: Array,
    required: true,
  },
});

export const ConversationChannel =
  mongoose.models?.ConversationChannels ||
  mongoose.model("conversation_channel", ConversationChannelSchema);
