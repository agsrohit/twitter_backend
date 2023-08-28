const express = require("express");
const { register, login,  tweetsByUser, deleteAccount } = require("../controllers/user.controller");

const auth = require("../middlewares/auth.middleware");

const userRouter = express.Router();

// register
userRouter.post("/register", register);
// login
userRouter.post("/login", login);
// get tweets as per user_id
userRouter.get("/:id",tweetsByUser)
// delete account
userRouter.delete("/",auth,deleteAccount)

module.exports = userRouter;

