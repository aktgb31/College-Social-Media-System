const { DataTypes } = require("sequelize");
const db = require("../config/database");
const { hash } = require("../utils/encrypt");
const errorHandler = require("../utils/errorHandler");

const user = db.define("user", {
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("firstName", value.toUpperCase());
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("lastName", value.toUpperCase());
    },
  },
  emailId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      isNitcEmail(value) {
        if (value.slice(-11) != "@nitc.ac.in") {
          throw new errorHandler("Only nitc emails are allowed", 406);
        }
      },
    },
    set(value) {
      this.setDataValue("emailId", value.toLowerCase());
    },
  },
  passingYear: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  branch: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("branch", value.toUpperCase());
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", hash(this.emailId + value));
    },
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: { isDate: true },
  },
  gender: {
    type: DataTypes.STRING(20),
    allowNull: false,
    set(value) {
      this.setDataValue("gender", value.toUpperCase());
    },
    validate: { isIn: [["MALE", "FEMALE", "DECLINE TO SAY"]] },
  },
  profilePic: {
    type: DataTypes.STRING,
    set(value) {
      if (this.gender == "FEMALE") {
        this.setDataValue("profilePic", "female.png");
      } else {
        this.setDataValue("profilePic", "male.png");
      }
    },
  },
});
user.sync();
module.exports = user;
