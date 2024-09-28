import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';


const sendMessage = async(req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.user._id; // Changed from senderId to receiverId
    const { id: senderId } = req.params; // Changed from receiverId to senderId

    
    
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "senderId, receiverId and message are required" });
      }
    // Find an existing conversation or create a new one
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      recieverId: receiverId,
      message
    });
    
    conversation.messages.push(newMessage._id);
    
    await Promise.all([newMessage.save(), conversation.save()]);
    res.status(201).json(newMessage);
  }
   catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
} 

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }
    }).populate('messages');

    res.status(200).json(conversation.messages);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.status(200).json(Message);
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export {sendMessage, getMessages} ;