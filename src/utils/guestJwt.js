const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwtConfig");

function generateGuestToken({ sessionId, tableId }) {
  const payload = {
    type: "guest",
    sessionId,
    tableId,
  };
  return jwt.sign(payload, jwtSecret, { expiresIn: "30m" });
}

module.exports = { generateGuestToken };