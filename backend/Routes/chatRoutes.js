const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { accesChat } = require("../Controllers/chatController");

const router = express.Router();

router.route("/").post(protect, accesChat);

module.exports = router;
