const db = require("../config/db");
const User = db.users;
const Tweet = db.tweets;
const Reply = db.reply

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
    res.status(500).json({ message: error });
  }
};

const tweetDetailsByUserreply = async (req, res) => {
  const user_id = req.user_id;
  try {
    const tweetDetailsByUser = await User.findAll({
      include: [
        {
          model: Tweet,
          as: "tweetscommentbyuser",
        },
      ],
      where: { user_id: user_id },
    });
    res.status(200).json(tweetDetailsByUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const userDetailsByTweetReply = async (req, res) => {
  const { id } = req.params;
  try {
    const tweetDetailsByUser = await Tweet.findAll({
      include: [
        {
          model: User,
          as: "userscommentontweet",
          attributes: ['user_id', 'name'], 
        //   attributes:['name','user_name','reply'],
        //    through: { attributes: [] },
        //    attributes: ['name', 'user_name', 'reply']
        //    include : ['name','user_name','reply']
        //  attributes: { include: ['user_id','password','email','gender','reply'] },
          
        },
      ],
      where: { tweet_id: id },
    });
    
    res.status(200).json(tweetDetailsByUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { reply, tweetDetailsByUserreply, userDetailsByTweetReply };
