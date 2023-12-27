const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../Controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, allUsers);
router.route("/signup").post(registerUser);
router.route("/login").post(authUser);

module.exports = router;
