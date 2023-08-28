const db = require("../config/db");
const Tweet = db.tweets;
const User = db.users;

// tweet can post by particular user
const tweetsUser = async (req, res) => {
  try {
    const tweetsUser = await Tweet.findAll({
      include: [
        {
          model: User,
          attributes: ["user_id", "name", "user_name"],
        },
      ],
      attributes: ["tweet", "date_time"],
    });
    res.status(200).json(tweetsUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// post the tweet
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
};

// delete tweet
const deleteTweet = async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await Tweet.findbyPk(id);
    if (!tweet) {
      req.status(400).json({ message: "Tweet not found" });
    }
    await Tweet.destroy({
      where: { tweet_id: id },
    });
    res.status(204).json({ message: "tweet has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { tweetsUser, postTweet, deleteTweet };
