const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  tweetDetailsByUserreply,
  userDetailsByTweetReply,
  reply,
} = require("../controllers/reply.controller");

const replyRouter = express.Router();

replyRouter
  .get("/", auth, tweetDetailsByUserreply)
  .get("/:id", auth, userDetailsByTweetReply)
  .post("/:id", auth, reply);

module.exports = replyRouter;
