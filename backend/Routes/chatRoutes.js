const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createChat,
  fetchChat,
  CreateGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
} = require("../Controllers/chatController");

const router = express.Router();

router.route("/").post(protect, createChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, CreateGroupChat);
router.route("/groupRename").put(protect, renameGroupChat);
router.route("/addMember").put(protect, addToGroup);
router.route("/remMember").put(protect, removeFromGroup);

module.exports = router;
