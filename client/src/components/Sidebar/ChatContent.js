import React from "react";
import { Box, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadMessage: {
    backgroundColor: "#3A8DFF",
    color: "white",
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, activeConversation, lastMessageStatus } = props;
  const { latestMessageText, otherUser, unread } = conversation;
  
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      { lastMessageStatus && unread > 0 && activeConversation !== otherUser.username &&
         <Chip className={classes.unreadMessage} label={unread}/>
      }
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    activeConversation: state.activeConversation,
  };
};

export default connect(mapStateToProps, null)(ChatContent);
