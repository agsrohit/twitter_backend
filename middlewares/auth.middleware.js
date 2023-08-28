require("dotenv").config();
const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      req.user_id = decoded.user_id;
      next();
    } else {
      res.status(400).json({ message: "Please Login first !" });
    }
  } else {
    res.status(400).json({ message: "Please Login first !" });
  }
};


module.exports = auth;
