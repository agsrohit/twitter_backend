const express = require("express");
const db = require("../config/db");
const auth = require("../middlewares/auth.middleware");
const { tweetDetailsByUserreply, userDetailsByTweetReply } = require("../controllers/reply.controller");
const reply = require("../models/reply");

const Reply = db.reply;
const User = db.users;
const Tweet = db.tweets;

const replyRouter = express.Router();



replyRouter.get("/tweets",auth,tweetDetailsByUserreply)
replyRouter.get("/users/:id",auth,userDetailsByTweetReply)

replyRouter.post("/:id", auth,reply );

// reply on the basis of user
// replyRouter.get("/", auth, async (req, res) => {
//   const user_id = req.user_id;
//   try {
//     const replies = await User.findAll({
//       include: [
//         {
//           model: Reply,
//         },
//       ],

//       where: { user_id: user_id },
//     });
//     res.status(200).json(replies);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// });

// users based on the reply
// replyRouter.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const users = await Reply.findAll({
//       include: [
//         {
//           model: User,
//         },
//       ],

//       where: { reply_id: id },
//     });
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// });

// reply based on the tweets
// replyRouter.get("/tweet/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const reply = await Tweet.findAll({

//       include: [
//         {
//           model: Reply,
//         },
//       ],
//       where: { tweet_id: id },
//     });
//     res.status(200).json(reply);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// });

// tweets on the basis of reply
// replyRouter.get("/tweet/:id", auth, async (req, res) => {
//    const {id} = req.params
//     try {
//       const replies = await Reply.findAll({
//         include: [
//           {
//             model: Tweet,
//           },
//         ],

//         where: { tweet_id: id },
//       });
//       res.status(200).json(replies);
//     } catch (error) {
//       res.status(500).json({ message: error });
//     }
//   });







module.exports = replyRouter;
