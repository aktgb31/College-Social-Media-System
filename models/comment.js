const { DataTypes } = require("sequelize");
const { db } = require("../config/database");
const { user } = require("./user")

const comment = db.define("comment",
    {
        commentId: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        content: { type: DataTypes.STRING, allowNull: false },
        postId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        creatorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    }
);

comment.belongsTo(user, { foreignKey: 'creatorId', targetKey: 'userId' });
module.exports = { comment };