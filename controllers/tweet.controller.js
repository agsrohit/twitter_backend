
const db = require("../config/db");
const Tweet = db.tweets;
const User = db.users


// tweet can post by particular user
const tweetsUser = async (req, res) => {
    try {
      const tweetsUser = await Tweet.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
      res.status(200).json(tweetsUser);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };


const postTweet = async (req, res) => {
    const { tweet } = req.body;
    const user_id = req.user_id;
    try {
      await Tweet.create({
        tweet: tweet,
        user_id: user_id,
      });
      res.status(201).json({ message: "Tweet has been posted  !" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  module.exports = {tweetsUser,postTweet}