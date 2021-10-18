const { DataTypes } = require("sequelize");
const { db } = require("../loaders/connectDb");
const { user } = require("./user");

const message = db.define("message", {
    messageId: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    senderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    receiverId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    hashedContent: { type: DataTypes.STRING, allowNull: false }
},

);

message.belongsTo(user, { foreignKey: 'senderId', targetKey: 'userId' });
message.belongsTo(user, { foreignKey: "receiverId", targetKey: "userId" });

db.sync();
module.exports = { message }




