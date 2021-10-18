const { DataTypes } = require("sequelize");
const { db } = require("../loaders/connectDb");

const user = db.define(
  "user",
  {
    userId: { typeof: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING(20), allowNull: false },
    lastName: { type: DataTypes.STRING(20), allowNull: false },
    hashedEmailId: { type: DataTypes.STRING, allowNull: false },
    hashedPassword: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATE, allowNull: false },
    gender: { type: String(20), allowNull: false },
    // profilePic: { type: String ,default}
  },
  {
    timestamps: false,
  }
);



db.sync();

module.exports = {
  user,
};
