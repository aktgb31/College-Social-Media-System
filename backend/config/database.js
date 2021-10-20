const Sequelize = require("sequelize");
const config = require(".");

const Db = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.pass,
  {
    host: config.database.uri,
    dialect: config.database.dialect,
    logging: false,
  }
);
Db.authenticate()
  .then(() => console.log("Connection to Database established Successfully"))
  .catch((err) => {
    console.log("Unable to connect to Database", err.message);
    process.exit(1);
  });

module.exports = Db;
