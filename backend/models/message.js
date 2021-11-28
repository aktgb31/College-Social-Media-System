const { DataTypes } = require("sequelize");
const Db = require("../config/database");
const { decrypt, encrypt } = require("../utils/encrypt");
const { User } = require("./user");

const Message = Db.define("message", {
    messageId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    senderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    receiverId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    hashedContent: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() { return decrypt(this.getDataValue("hashedContent")); },
        set(value) { this.setDataValue("hashedContent", encrypt(value)); },
    },
}, { updatedAt: false });

User.hasMany(Message, {
    foreignKey: "senderId",
    targetKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
User.hasMany(Message, {
    foreignKey: "receiverId",
    targetKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = { Message };