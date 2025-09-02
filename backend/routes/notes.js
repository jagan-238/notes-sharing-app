const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const Note = require("../models/Note");
const User = require("../models/User");

// Get all notes (admin) or my notes + shared
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const notes = await Note.find().populate("owner sharedWith", "name email");
      return res.json({ notes });
    }
    const myNotes = await Note.find({ owner: req.user.id }).populate("owner sharedWith", "name email");
    const sharedNotes = await Note.find({ sharedWith: req.user.id }).populate("owner sharedWith", "name email");
    res.json({ myNotes, sharedNotes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create note
router.post("/", auth, async (req, res) => {
  try {
    const note = await Note.create({ ...req.body, owner: req.user.id });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update note
router.put("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.owner.toString() !== req.user.id && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    note.title = req.body.title || note.title;
    note.description = req.body.description || note.description;
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete note
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.owner.toString() !== req.user.id && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await note.deleteOne();
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Share note
router.post("/share/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.owner.toString() !== req.user.id && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const userToShare = await User.findOne({ email: req.body.email });
    if (!userToShare) return res.status(404).json({ message: "User not found" });

    if (!note.sharedWith.includes(userToShare._id)) {
      note.sharedWith.push(userToShare._id);
      await note.save();
    }

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
