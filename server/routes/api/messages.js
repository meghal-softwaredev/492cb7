const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );
  
    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      await Conversation.update({ 
        unread: conversation.unread + 1,
        lastUnseenCount: conversation.lastUnseenCount + 1
      },
      { 
        where: {
          id: conversation.id 
        }
      });
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    
    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
        unread: 1,
        lastUnseenCount: 1
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
