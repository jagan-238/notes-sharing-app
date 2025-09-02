const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const User = require("../models/User");

// Get all users (Admin only)
router.get("/", auth, role(["Admin"]), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Update profile
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "Admin")
      return res.status(403).json({ message: "Not authorized" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
