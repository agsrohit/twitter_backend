const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  follow,
  followingDetails,
  followerDetails,
} = require("../controllers/follow.controller");

const followRouter = express.Router();

followRouter
  .post("/:id", auth, follow)
  .get("/following/:id", auth, followingDetails)
  .get("/followers/:id", auth, followerDetails);

module.exports = followRouter;
