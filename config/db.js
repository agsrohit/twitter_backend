const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);


const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require("../models/users")(sequelize,DataTypes)
db.tweets = require("../models/tweets")(sequelize,DataTypes)


// user to tweeet association
db.users.hasMany(db.tweets,{foreignKey:"user_id"});
db.tweets.belongsTo(db.users,{foreignKey:"user_id"})



sequelize.sync({ force: false});

module.exports = db