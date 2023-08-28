const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();
const User = db.users;
const Tweet = db.tweets;

// register
const register = async (req, res) => {
  const { name, user_name, password, gender, email } = req.body;
  try {
    const exist = await User.findOne({ where: { email: email } });
    if (exist !== null) {
      res.json({ message: "User already exists !" });
    } else if (password.length < 5 || password.length > 8) {
      console.log(password);
      res
        .status(400)
        .json({ message: "Password length must be between 5 to 8 characters" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(500).json({ message: err });
        }

        try {
          await User.create({
            name: name,
            user_name: user_name,
            password: hash,
            gender: gender,
            email: email,
          });
          res.status(201).json({ message: "Registration has been done !" });
        } catch (error) {
          res.status(400).json({ message: error.errors });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exist = await User.findOne({ where: { email: email } });
    if (exist === null) {
      // result == true
      res.status(200).json({ message: "Plese signup first!" });
    }
    bcrypt.compare(password, exist.password, (err, result) => {
      if (err) {
        res.send(err);
      }

      if (result) {
        const token = jwt.sign(
          { user_id: exist.user_id },
          process.env.SECRET_KEY,
          { expiresIn: "1hr" }
        );
        res.status(200).json({
          token: token,
          message: "Login Successful !",
        });
      } else {
        res.status(400).json({ message: "Wrong Creditionals !" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// users has many tweets
const tweetsByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const usertweets = await User.findAll({
      include: [
        {
          model: Tweet,
          attributes:['tweet_id','tweet','date_time']
        },
      ],
      where: { user_id: id },
      attributes:['user_id','name','user_name'],
    });
    res.status(200).json(usertweets);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// delete account
const deleteAccount = async (req, res) => {
  const user_id = req.user_id;
  try {
    const deleteAccount = await User.destroy({ where: { user_id: user_id } });
    res.status(200).json({ message: "Your account has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { register, login, tweetsByUser, deleteAccount };
