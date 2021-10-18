const { DataTypes } = require("sequelize");
const { database } = require("../config");
const { db } = require("../loaders/connectDb");
const { hash } = require("../utils/encrypt")

const user = db.define("user", {
  userId: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  firstName: { type: DataTypes.STRING, allowNull: false, validate: { isAlpha: true } },
  lastName: { type: DataTypes.STRING, allowNull: false, validate: { isAlpha: true } },
  emailId: {
    type: DataTypes.STRING, allowNull: false, unique: true, validate: {
      isEmail: true, isNitcEmail(value) { if (value.slice(-11) != "@nitc.ac.in") { throw new Error('Only nitc emails are allowed'); } }
    }
  },
  password: { type: DataTypes.STRING, allowNull: false, set(value) { this.setDataValue('password', hash(this.emailId + value)); } },
  dob: { type: DataTypes.DATEONLY, allowNull: false, validate: { isValidDob(value) { if (value > Date()) { throw new Error('Invalid Date of Birth'); } } } },
  gender: { type: DataTypes.STRING(20), allowNull: false, set(value) { this.setDataValue('gender', value.toUpperCase()); }, validate: { isIn: [['MALE', 'FEMALE', 'DECLINE TO SAY']] } },
  profilePic: { type: DataTypes.STRING, set(value) { if (this.gender == 'FEMALE') { this.setDataValue('profilePic', 'female.png') } else { this.setDataValue('profilePic', 'male.png') } } }
}
);
module.exports = {
  user,
};
