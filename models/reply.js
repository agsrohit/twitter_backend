const db = require("../config/db");
const Tweet = db.tweets;
const User = db.users;

module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define("reply", {
    reply_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    tweet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    replyText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_time: {
      type: DataTypes.DATE,
      defaultValue: new Date().toISOString(),
    },
  });


  return Reply;
};
