const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  tweetDetailsByUserreply,
  userDetailsByTweetReply,
  reply,
} = require("../controllers/reply.controller");
const replyRouter = express.Router();

replyRouter.get("/", auth, tweetDetailsByUserreply);
replyRouter.get("/:id", auth, userDetailsByTweetReply);
replyRouter.post("/:id", auth, reply);
replyRouter.delete("")

module.exports = replyRouter;
