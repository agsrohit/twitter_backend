const db = require("../config/db");
const Tweet = db.tweets;
const User = db.users;

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("like", {
    like_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tweet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tweet,
        key: "tweet_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
  });

  return Like;
};
