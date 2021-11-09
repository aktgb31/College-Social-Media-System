const { DataTypes } = require("sequelize");
const Db = require("../config/database");
const { User } = require("./user");

const Event = Db.define("event", {
    eventId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    eventName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eventTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    creatorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    }
}, { timestamps: false });

User.hasMany(Event, {
    foreignKey: "creatorId",
    targetKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = Event;