import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { updateconversationAfterCreateMessage } from "../utils/messageHelper.js";

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user._id;

    let conversation;

    if (!content) {
      return res.status(400).json({ message: "Lack of content" });
    }
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
    }
    if (!conversation) {
      conversation = await Conversation.create({
        type: "direct",
        participants: [
          { userId: senderId, joinedAt: new Date() },
          { userId: recipientId, joinedAt: new Date() },
        ],
        lastMessageAt: new Date(),
        unreadCounts: new Map(),
      });
    }

    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content,
    });

    updateconversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();

    return res.status(201).json({message});
  } catch (error) {
    console.error("System error", error);
    return res.status(500).json({messgae:"System error"});
  }
};

export const sendGrouptMessage = async (req, res) => {};
