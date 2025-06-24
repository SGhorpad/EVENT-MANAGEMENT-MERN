const mongoose = require("mongoose");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/eventdb");

    const existingAdmin = await User.findOne({
      $or: [
        { email: "adminexample@gmail.com" },
        { username: "Admin" }
      ]
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists.");
      return;
    }

    // Do NOT hash the password here, just provide plain text
    const adminUser = new User({
      username: "Admin",
      email: "adminexample@gmail.com",
      password: "admin123", // plain password only
      role: "admin",
    });

    await adminUser.save();
    console.log("✅ Default admin created.");
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  } finally {
    await mongoose.disconnect();
  }
};

// Call the function
createAdmin();
