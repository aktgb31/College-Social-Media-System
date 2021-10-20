const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const Db = require("../config/database");

const sessionStore = new SequelizeStore({
  db: Db,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 1 * 60 * 60 * 1000, // 1hour
});
module.exports = sessionStore;
