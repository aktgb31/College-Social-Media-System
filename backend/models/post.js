const { DataTypes } = require("sequelize");
const Db = require("../config/database");
const { Thread } = require("./thread");
const { User } = require("./user");
const { Reaction } = require("./reaction");
const { Comment } = require("./comment");

const Post = Db.define("post", {
    postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    creatorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    threadId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    relatedImage: { type: DataTypes.STRING, allowNull: true }
}, { updatedAt: false });

User.hasMany(Post, {
    foreignKey: "creatorId",
    targetKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Thread.hasMany(Post, {
    foreignKey: "threadId",
    targetKey: "threadId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    allowNull: true
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
    targetKey: 'postId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

Post.hasMany(Reaction, {
    foreignKey: 'postId',
    targetKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

exports.Post = Post;