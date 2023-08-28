const db = require("../config/db");
const Follow = db.follows;
const User = db.users;

// follow to any of the user
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

// to unfollow anyone
const unfollow = async () => {
  const user_id = req.user_id
  const { id } = req.params;

  try {
    await Follow.destroy({
     where : { [Op.and]: [{ follower_user_id: user_id }, { following_user_id: id }],}
    })
    res.status(200).json({messsage:`You unfollow user who has id ${id}`})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// following details
const followingDetails = async (req, res) => {
  const user_id = req.user_id;
  try {
    const followingDetails = await User.findAll({
      include: [
        {
          model: User,
          as: "followingDetails",
          through: { attributes: [] },
          attributes: ["user_id", "name", "user_name", "create_at"],
        },
      ],
      where: { user_id: user_id },
      attributes: ["user_id", "name", "user_name"],
    });
    res.status(200).json(followingDetails);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// followers details
const followerDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const followerDetails = await User.findAll({
      include: [
        {
          model: User,
          as: "followerDetails",
          attributes: ["user_id", "name", "user_name"],
          through: { attributes: [] },
        },
      ],
      where: { user_id: id },
      attributes: ["user_id", "name", "user_name"],
    });
    res.status(200).json(followerDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { follow, followingDetails, followerDetails,unfollow };
