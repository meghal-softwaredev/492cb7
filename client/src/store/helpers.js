export const getLastSeenMessage = (user, conversation) => {
  const unreadCount = conversation.lastUnseenCount;
  let lastMessage;
  if (unreadCount > 0) {
    lastMessage = conversation.messages && conversation.messages.slice().reverse().filter(message => user.id === message.senderId).slice(unreadCount);
  } else {
    lastMessage = conversation.messages && conversation.messages.filter(message => user.id === message.senderId).slice(-1);
  }
  return lastMessage;
};

export const messageStatus = (user, conversation) => {
  const lastMessage = conversation.messages && conversation.messages.slice(-1);
  let lastMessageStatus;
  if (conversation.id) {
   lastMessageStatus = lastMessage && lastMessage[0].senderId !== user.id;
  }
  return lastMessageStatus;
}