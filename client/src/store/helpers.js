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