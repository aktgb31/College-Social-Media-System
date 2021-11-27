const { DataTypes } = require("sequelize");
const Db = require("../config/database");
const { User } = require("./user");

const Reaction = Db.define("reaction", {
    reactionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    reactionType: {
        type: DataTypes.ENUM,
        values: ['upvote', 'downvote', 'report'],
        allowNull: false
    }
}, {
    timestamps: false,
});


User.hasMany(Reaction, {
    foreignKey: 'userId',
    targetKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = { Reaction };