const Sequelize = require("sequelize");
const db = require("../db");

// Junction model of many-to-many relationship between User and Conversation.
const UserConversation = db.define("user_conversation", {
  unread: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = UserConversation;
