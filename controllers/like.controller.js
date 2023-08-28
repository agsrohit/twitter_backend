const db = require("../config/db");
const Like = db.likes;
const User = db.users;
const Tweet = db.tweets;
const { Op } = require("sequelize");


// like and dislike tweets
const like = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user_id;
  try {
    const exist = await Like.findOne({
      where: { [Op.and]: [{ user_id: user_id }, { tweet_id: id }] },
    });

    if (exist) {
      await Like.destroy({
        where: {
          [Op.and]: [{ user_id: user_id }, { tweet_id: id }],
        },
      });
      res.status(200).json({message:"You dislike the post"});
    } else {
      await Like.create({
        tweet_id: id,
        user_id: user_id,
      });
      res.status(200).json({ message: "You like the tweet !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// users who like the particular tweet
const usersDetailsByTweet = async (req, res) => {
  const { id } = req.params;
  try {
    const usersDetailsByTweet = await Tweet.findAll({
      include: [
        {
          model: User,
          as: "userswholiketweet",
          through: { attributes: [] },
          attributes: ["user_id", "name", "user_name"],
        },
      ],

      where: { tweet_id: id },
      attributes:['tweet_id','tweet','date_time']
    });
    res.status(200).json(usersDetailsByTweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// tweets which are like by particular user
const tweetDetailsByUser = async (req, res) => {
  const user_id = req.user_id;
  try {
    const tweetDetailsByUser = await User.findAll({
      include: [
        {
          model: Tweet,
          as: "tweetslikebyuser",
          through: { attributes: [] },
          attributes:['tweet_id','tweet','date_time']
        },
      ],
      where: { user_id: user_id },
      attributes: ["user_id", "name", "user_name"]
    });
    res.status(200).json(tweetDetailsByUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { like, tweetDetailsByUser, usersDetailsByTweet };
