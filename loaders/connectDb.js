const Sequelize = require("sequelize");
const config = require("../config");

const db = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.pass,
  {
    host: config.database.uri,
    dialect: config.database.dialect,
  }
);

db.authenticate()
  .then(() => console.log("Connection to Database established Successfully"))
  .catch((err) => console.error("Unable to connect to Database", err));

module.exports = { db };
