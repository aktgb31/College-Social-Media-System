const crypto = require("crypto");
const hash = (pwd) => { return crypto.createHash("sha256").update(pwd).digest("base64") };

module.exports = { hash }