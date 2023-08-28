const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  like,
  usersDetailsByTweet,
  tweetDetailsByUser,
} = require("../controllers/like.controller");

const likeRouter = express.Router();

likeRouter
  .post("/:id", auth, like)
  .get("/:id", usersDetailsByTweet)
  .get("/", auth, tweetDetailsByUser);

module.exports = likeRouter;
