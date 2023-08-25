const express = require("express");
const { register, login,  tweetsByUser } = require("../controllers/user.controller");

const userRouter = express.Router();

// register
userRouter.post("/register", register);

// login
userRouter.post("/login", login);


// get tweets as per user_id
userRouter.get("/:id",tweetsByUser)


module.exports = userRouter;

