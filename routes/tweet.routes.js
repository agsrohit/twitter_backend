const express = require("express");
const auth = require("../middlewares/auth.middleware");
const { postTweet, tweetsUser, deleteTweet } = require("../controllers/tweet.controller");

const tweetRouter = express.Router();

tweetRouter.post("/", auth, postTweet);
tweetRouter.get("/", auth, tweetsUser);
tweetRouter.delete("/:id",auth,deleteTweet)

module.exports = tweetRouter;


