const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const generateRandomToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

module.exports = generateRandomToken;
