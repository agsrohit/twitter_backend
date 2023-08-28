const express = require("express");
require("dotenv").config()
const { sequelize } = require("./config/db");
const userRouter = require("./routes/user.routes");
const tweetRouter = require("./routes/tweet.routes");
const followRouter = require("./routes/follow.routes");
const likeRouter = require("./routes/like.routes");
const replyRouter = require("./routes/reply.routes");

const app = express();

// middleware
app.use(express.json());


// routes
app.use("/user", userRouter);
app.use("/tweet", tweetRouter);
app.use("/follow", followRouter);
app.use("/like", likeRouter);
app.use("/reply", replyRouter);


// get started
app.get("/", (req, res) => {
  res.send("home page");
});


// listen
app.listen(process.env.PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`Server is running on port ${process.env.PORT}`);
});
