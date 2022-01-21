export const addMessageToStore = (state, payload) => {
  const { message, sender, activeConversation } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newState = state.filter((convo) => convo.otherUser.id !== sender.id);
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unread: 1,
      lastUnseenCount: 1
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...newState];
  }
  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages = [...convoCopy.messages, message];
      convoCopy.latestMessageText = message.text;
      if (typeof activeConversation !== "undefined" && activeConversation !== convo.otherUser.username) {
        convoCopy.unread = convo.unread + 1;
      }
      if (typeof activeConversation === "undefined") {
        convoCopy.lastUnseenCount = convo.lastUnseenCount + 1;
      }
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo };
      convoCopy.messages = [...convoCopy.messages, message];
      convoCopy.id = message.conversationId;
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const resetUnreadMessages = (state, conversationId) => {
  return state.map((convo) => { 
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      convoCopy.unread = 0;
      convoCopy.lastUnseenCount = 0;
      return convoCopy;
    } else {
      return convo;
    }
  });
}

export const resetUnseenCount = (state, conversationId) => {
  return state.map((convo) => { 
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      convoCopy.lastUnseenCount = 0;
      return convoCopy;
    } else {
      return convo;
    }
  });
}