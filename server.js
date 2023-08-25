const express = require("express");
const { sequelize } = require("./config/db");
const userRouter = require("./routes/user.routes");
const tweetRouter = require("./routes/tweet.routes");

const app = express();
app.use(express.json())


app.use("/user",userRouter)
app.use("/tweet",tweetRouter)

app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(8000, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log("Server is running on port 8000");
});
