const { DataTypes } = require("sequelize");
const Db = require("../config/database");
const { User } = require("./user");

const Thread = Db.define("thread", {
    threadId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    creatorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    threadTitle: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
});

User.hasMany(Thread, {
    foreignKey: "creatorId",
    targetKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

exports.Thread = Thread;