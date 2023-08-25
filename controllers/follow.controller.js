const db = require("../config/db");
const Follow = db.follows;
const User = db.users;



const follow = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user_id;
  try {
    if (id == user_id) {
      res.status(200).json({ message: "You cannot follow yourself" });
    }

    const follow = await Follow.create({
      follower_user_id: user_id,
      following_user_id: id,
    });

    res.status(200).json(follow);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};



const followingDetails = async (req, res) => {
  const user_id = req.user_id;
  try {
    const followingDetails = await User.findAll({
      include: [
        {
          model: User,
          as: "followingDetails",
          through: { attributes: [] },
          attributes: { exclude: ["follow"] },
        },
      ],
      where: { user_id: user_id },
    });
    res.status(200).json(followingDetails);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


const followerDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const followerDetails = await User.findAll({
      include: [
        {
          model: User,
          as: "followerDetails",
          through: { attributes: [] },
          attributes: { exclude: ["follow"] },
        },
      ],
      where: { user_id: id },
    });
    res.status(200).json(followerDetails);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { follow, followingDetails, followerDetails };
