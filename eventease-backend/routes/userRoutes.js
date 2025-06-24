const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // don't send password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


//reset psw
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


module.exports = router;
