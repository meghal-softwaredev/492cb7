import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  updateUnseenCountStatus,
  resetUnreadMessagesStatus
} from "./store/conversations";
import {
  updateReadStatusOnMessageArrival
} from "./store/utils/thunkCreators";
const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    const { activeConversation, conversations } = store.getState();
    store.dispatch(setNewMessage(data.message, data.sender, activeConversation));
    const conversationId = updateReadStatusOnMessageArrival({ activeConversation, conversations })
    if (conversationId) {
      store.dispatch(resetUnreadMessagesStatus(conversationId));
    }
  });

  socket.on("update-unread-status", (data) => {
    store.dispatch(updateUnseenCountStatus(data));
  });

});

export default socket;
