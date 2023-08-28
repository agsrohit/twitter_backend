const express = require("express");
const {
  register,
  login,
  tweetsByUser,
  deleteAccount,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter
  .post("/register", register)
  .post("/login", login)
  .get("/:id", tweetsByUser)
  .delete("/", auth, deleteAccount);

module.exports = userRouter;
