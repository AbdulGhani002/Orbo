const User = require("../models/User.model");

const getAllUsers = async (req, res) => {
  console.log("Got here");
  try {
    console.log("Got here too");
    const users = await User.getAllUsers();
    console.log(users);
    res.render("admin/all-users", { users });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const restrictUser = async (req, res) => {
  const userId = req.params.id;
  await User.findByIdAndUpdate(userId, { isAdmin: false });
  res.redirect("/admin/users");
};

module.exports = {
  getAllUsers,
  restrictUser,
};
