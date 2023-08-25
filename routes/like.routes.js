const express = require("express");


const auth = require("../middlewares/auth.middleware");
const {
  like,
  usersDetailsByTweet,
  tweetDetailsByUser,
  dislike,
} = require("../controllers/like.controller");

const likeRouter = express.Router();

// like the tweet
likeRouter.post("/:id", auth, like);

// users details who like base on the tweet
likeRouter.get("/:id", usersDetailsByTweet);

// tweet details which like by users
likeRouter.get("/", auth, tweetDetailsByUser);


likeRouter.delete("/:id",auth,dislike)


module.exports = likeRouter;

