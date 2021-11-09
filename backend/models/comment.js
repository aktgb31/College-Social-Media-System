const { DataTypes } = require("sequelize");
const Db = require("../config/database");
const { User } = require("./user")

const Comment = Db.define("comment", {
    commentId: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    content: { type: DataTypes.STRING, allowNull: false },
    postId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    creatorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, { updatedAt: false });

User.hasMany(Comment, {
    foreignKey: 'creatorId',
    targetKey: 'userId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});
module.exports = { Comment };