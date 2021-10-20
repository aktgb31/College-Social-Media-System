const { DataTypes } = require("sequelize");
const Db = require("../loaders/connectDb");
const User = require("./user");

const Post = Db.define("post", {
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

Post.belongsTo(User, { foreignKey: "creatorId", targetKey: "userId" });

module.exports = { post };
