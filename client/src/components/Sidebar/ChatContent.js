import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
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
    color: "white",
    fontWeight: "bold",
  },
  unreadLastMessageText: {
    color:"black",
    fontWeight: "bold",
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, activeConversation, lastMessageStatus } = props;
  const { latestMessageText, otherUser, unreadBadge } = conversation;
  
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={unreadBadge > 0 ? `${classes.previewText} ${classes.unreadLastMessageText}` : `${classes.previewText}`}>
          {latestMessageText}
        </Typography>
      </Box>
      { lastMessageStatus && unreadBadge > 0 && activeConversation !== otherUser.username &&
      <Box mr={3} mt={1}>
         <Badge badgeContent={unreadBadge} color="primary" />
      </Box>
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
