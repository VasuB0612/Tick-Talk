const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { accesChat, fetchChat } = require("../Controllers/chatController");

const router = express.Router();

router.route("/").post(protect, accesChat);
router.route("/").get(protect, fetchChat);

module.exports = router;
