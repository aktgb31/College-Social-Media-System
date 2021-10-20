const { DataTypes } = require("sequelize");
const { db } = require("../loaders/connectDb");
const { user } = require("./user");

const thread = db.define("thread", {
    threadId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    creatorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    threadtitle: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

thread.belongsTo(user, { foreignKey: "creatorId", targetKey: "userId" });

db.sync();
module.exports = { message };
