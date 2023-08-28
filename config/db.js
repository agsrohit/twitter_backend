const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging:false
  },
  
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require("../models/users")(sequelize, DataTypes);
db.tweets = require("../models/tweets")(sequelize, DataTypes);

// junction table for follower and following
db.follows = require("../models/follow")(sequelize, DataTypes);
db.likes = require("../models/likes")(sequelize, DataTypes);
db.reply = require("../models/reply")(sequelize, DataTypes);

// user to tweet association
db.users.hasMany(db.tweets, { foreignKey: "user_id" });
db.tweets.belongsTo(db.users, { foreignKey: "user_id"});

// user to user association for follower and following
db.users.belongsToMany(db.users, {
  through: db.follows,
  as: "followingDetails",
  foreignKey: "follower_user_id",
});
db.users.belongsToMany(db.users, {
  through: db.follows,
  as: "followerDetails",
  foreignKey: "following_user_id",
});

//  user to tweet association for like
db.users.belongsToMany(db.tweets, {
  through: db.likes,
  as: "tweetslikebyuser",
  foreignKey: "user_id",
});
db.tweets.belongsToMany(db.users, {
  through: db.likes,
  as: "userswholiketweet",
  foreignKey: "tweet_id",
});

// user to tweet association for reply
db.users.belongsToMany(db.tweets, {
  through: db.reply,
  as: "tweetscommentbyuser",
  foreignKey: "user_id",
});
db.tweets.belongsToMany(db.users, {
  through: db.reply,
  as: "userscommentontweet",
  foreignKey: "tweet_id",
});

// user to reply association
db.users.hasMany(db.reply,{foreignKey:"user_id"})
db.reply.belongsTo(db.users,{foreignKey:"user_id"})

// tweet to reply association
db.tweets.hasMany(db.reply, { foreignKey: 'tweet_id' });
db.reply.belongsTo(db.tweets, { foreignKey: 'tweet_id' });

sequelize.sync({ force: false });

module.exports = db;
