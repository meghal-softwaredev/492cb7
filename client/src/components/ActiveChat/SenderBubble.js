import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    height: 30,
    width: 30,
    marginLeft: 11,
    marginTop: 6
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    marginRight: 20,
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "10px 0px 10px 10px"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { text, time, user } = props;
  return (
    <Box className={classes.root}>
      <Box className={classes.row}>
        <Typography className={classes.date}>
          {user.username} {time}
        </Typography>
        <Avatar alt={user.username} src={user.photoUrl} className={classes.avatar}></Avatar>
      </Box>
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
    </Box>
  );
};

export default SenderBubble;
