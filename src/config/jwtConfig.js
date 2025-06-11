require('dotenv').config()
const crypto = require('crypto');

// Use secret key from environment variables or generate a new one if not set
const jwtSecret = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');


module.exports = {
    jwtSecret: jwtSecret
}
