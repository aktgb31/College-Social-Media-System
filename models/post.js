const { DataTypes } = require("sequelize");
const { db } = require("../loaders/connectDb");
const { user } = require("./user");

const post = db.define("post", {
    postId: {
        typeof: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    creatorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    commentCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
    },
});

post.belongsTo(user, { foreignKey: "creatorId", targetKey: "userId" });

module.exports = { post }



