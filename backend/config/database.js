const Sequelize = require("sequelize");
const { DATABASE } = require(".");

const Db = new Sequelize(DATABASE.name, DATABASE.user, DATABASE.pass, {
  host: DATABASE.uri,
  dialect: "mysql",
  logging: false,
});

module.exports = Db;
