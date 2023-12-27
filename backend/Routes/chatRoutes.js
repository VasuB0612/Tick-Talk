const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  accesChat,
  fetchChat,
  CreateGroupChat,
} = require("../Controllers/chatController");

const router = express.Router();

router.route("/").post(protect, accesChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, CreateGroupChat);

module.exports = router;
