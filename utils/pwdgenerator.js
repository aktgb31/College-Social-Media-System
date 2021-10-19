const random = require("random");

var pwdstring = Math.random().toString(36).slice(-8);


module.exports = { pwdstring };