const Sequelize = require("sequelize");
const config = require(".");

const db = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.pass,
  {
    host: config.database.uri,
    dialect: config.database.dialect,
    logging: false
  }
);

module.exports = db;
