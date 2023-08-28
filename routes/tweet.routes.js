const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  postTweet,
  tweetsUser,
  deleteTweet,
  updateTweet,
} = require("../controllers/tweet.controller");

const tweetRouter = express.Router();

tweetRouter
  .post("/", auth, postTweet)
  .get("/", auth, tweetsUser)
  .delete("/:id", auth, deleteTweet)
  .put("/:id", auth, updateTweet);

module.exports = tweetRouter;
