const db = require("../config/db");
const Like = db.likes;
const User = db.users;
const Tweet = db.tweets;
const { Op } = require("sequelize");

const like = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user_id;
  try {
    const like = await Like.create({
      tweet_id: id,
      user_id: user_id,
    });
    res.status(200).json(like);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const dislike = async(req,res)=>{
    const user_id = req.user_id;
    const {id} = req.params
    try {
       await Like.destroy({
        where : {
            [Op.and]: [{ user_id: user_id }, { tweet_id: id }], 
        }
       })
       res.status(200).json("Dislike")
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const usersDetailsByTweet = async (req, res) => {
  const { id } = req.params;
  try {
    const usersDetailsByTweet = await Tweet.findAll({
      include: [
        {
          model: User,
          as: "userswholiketweet",
          through: { attributes: [] },
          attributes: { exclude: ["like"] },
        },
      ],

      where: { tweet_id: id },
    });
    res.status(200).json(usersDetailsByTweet);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const tweetDetailsByUser = async (req, res) => {
  const user_id = req.user_id;
  try {
    const tweetDetailsByUser = await User.findAll({
      include: [
        {
          model: Tweet,
          as: "tweetslikebyuser",
          through: { attributes: [] },
          attributes: { exclude: ["like"] },
        },
      ],
      where: { user_id: user_id },
    });
    res.status(200).json(tweetDetailsByUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


module.exports = {like,tweetDetailsByUser,usersDetailsByTweet,dislike}