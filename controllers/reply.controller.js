const db = require("../config/db");
const User = db.users;
const Tweet = db.tweets;
const Reply = db.reply;

// reply to the tweet
const reply = async (req, res) => {
  const { id } = req.params;
  const { replyText } = req.body;
  const user_id = req.user_id;
  try {
    const reply = await Reply.create({
      tweet_id: id,
      user_id: user_id,
      replyText: replyText,
    });
    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// particular user comments on different tweets
const tweetDetailsByUserreply = async (req, res) => {
  const user_id = req.user_id;
  try {
    const tweetDetailsByUser = await User.findAll({
      include: [
        {
          model: Tweet,
          as: "tweetscommentbyuser",
          through: { attributes: [] },
          attributes: ["tweet_id", "tweet", "date_time"],
          include: [
            {
              model: Reply,
              attributes: ["reply_id","replyText", "date_time"],
            },
          ],
        },
      ],
      where: { user_id: user_id },
      attributes: ["user_id", "name", "user_name"],
    });

    res.status(200).json(tweetDetailsByUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// comments done by users in particular tweet
const userDetailsByTweetReply = async (req, res) => {
  const { id } = req.params;
  try {
    const tweetDetailsByUser = await Tweet.findAll({
      include: [
        {
          model: User,
          as: "userscommentontweet",
          through: { attributes: [] },
          attributes: ["user_id", "name", "user_name"],

          include: [
            {
              model: Reply,
              attributes: ["reply_id","replyText", "date_time"],
            },
          ],
        },
      ],
      where: { tweet_id: id },
      attributes: ["tweet_id", "tweet", "date_time"],
    });

    res.status(200).json(tweetDetailsByUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { reply, tweetDetailsByUserreply, userDetailsByTweetReply };
