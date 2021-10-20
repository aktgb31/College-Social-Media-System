const dotenv = require("dotenv");
const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find env file");
}

module.exports = {
  port: parseInt(process.env.PORT),
  database: {
    name: process.env.DATABASE_NAME,
    uri: process.env.DATABASE_URI,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    dialect: process.env.DATABASE_DIALECT,
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
};
