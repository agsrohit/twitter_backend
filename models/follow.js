const db = require("../config/db");
const User = db.users;

module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define("follow", {
    follower_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    follower_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    following_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
  });

  return Follower;
};
