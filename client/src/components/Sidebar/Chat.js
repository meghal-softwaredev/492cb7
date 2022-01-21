import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { resetUnreadCount } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, user } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation, user) => {
    await props.setActiveChat(conversation.otherUser.username);
    const lastMessage = conversation.messages && conversation.messages.slice(-1);
    if (lastMessage[0] && lastMessage[0].senderId !== user.id){
      await props.resetUnreadCount(conversation);
    }
  };

  return (
    <Box onClick={() => handleClick(conversation, user)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    resetUnreadCount: (conversation) => {
      dispatch(resetUnreadCount(conversation));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
