const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail"); // we created this earlier

const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: "15m",
});
//forget psw 



exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found with that email" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`;
    const html = `
      <p>Hi ${user.name || "User"},</p>
      <p>You requested to reset your password. Click the link below:</p>
      <a href="${resetURL}" target="_blank">${resetURL}</a>
      <p>This link will expire in 15 minutes.</p>
    `;

    await sendEmail(user.email, "Password Reset Request", html);

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

// 2. Reset Password
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json({ message: "Invalid token or user" });

    user.password = password; // This will hash automatically via pre-save hook
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(400).json({ message: "Token expired or invalid" });
  }
};