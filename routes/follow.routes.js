const express = require("express");

const auth = require("../middlewares/auth.middleware");
const {
  follow,
  followingDetails,
  followerDetails,
} = require("../controllers/follow.controller");

const followRouter = express.Router();

// to follow someone
followRouter.post("/:id", auth, follow);

// following details
followRouter.get("/following/:id", auth, followingDetails);

// followers details
followRouter.get("/followers/:id", auth, followerDetails);

module.exports = followRouter;
