import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { emitNewMessage, updateconversationAfterCreateMessage } from "../utils/messageHelper.js";
import { io } from "../socket/index.js";

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user._id;

    let conversation;

    // Validate content
    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Lack of content" });
    }

    // Validate recipientId for new conversations
    if (!conversationId && !recipientId) {
      return res.status(400).json({ message: "recipientId is required for new conversation" });
    }

    // ✅ Fix 1: Find existing conversation if conversationId is provided
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      
      // Verify conversation exists
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      // ✅ Fix 2: Verify sender is a participant
      const isParticipant = conversation.participants.some(
        (p) => p.userId.toString() === senderId.toString()
      );
      
      if (!isParticipant) {
        return res.status(403).json({ message: "You are not a participant of this conversation" });
      }
    } else {
      // ✅ Fix 3: Check if direct conversation already exists between these users
      conversation = await Conversation.findOne({
        type: "direct",
        "participants.userId": { $all: [senderId, recipientId] },
        "participants": { $size: 2 }  // Ensure exactly 2 participants
      });

      // Create new conversation only if it doesn't exist
      if (!conversation) {
        conversation = await Conversation.create({
          type: "direct",
          participants: [
            { userId: senderId, joinedAt: new Date() },
            { userId: recipientId, joinedAt: new Date() },
          ],
          lastMessageAt: new Date(),
          unreadCounts: new Map([
            [senderId.toString(), 0],
            [recipientId.toString(), 0]
          ]),
        });
      }
    }

    // Create message
    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content: content.trim(),
    });

    // Update conversation after message is created
    updateconversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();
    emitNewMessage(io, conversation, message)

    // ✅ Populate sender info for response
    await message.populate({
      path: 'senderId',
      select: 'displayName avatarUrl'
    });

    return res.status(201).json({ 
      message,
      conversationId: conversation._id 
    });
  } catch (error) {
    console.error("System error", error);
    return res.status(500).json({ message: "System error" });
  }
};

export const sendGrouptMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;
    const senderId = req.user._id;
    const conversation = req.conversation;

    if (!content) {
      return res.status(400).json("Lack of content");
    }
    const message = await Message.create({
      conversationId,
      senderId,
      content,
    });
    updateconversationAfterCreateMessage(conversation, message, senderId);

    await conversation.save();
    emitNewMessage(io, conversation, message)

    return res.status(201).json({ message });
  } catch (error) {
    console.error("System error", error);
    return res.status(500).json("System error");
  }
};
