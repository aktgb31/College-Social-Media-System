const { query } = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Post } = require("../models/post");
const ErrorHandler = require("../utils/errorHandler");

exports.getPosts = catchAsyncErrors(async(req, res, next) => {
    const queryOptions = {};
    queryOptions.where = {};
    if (req.query.postId)
        queryOptions.where.postId = parseInt(req.query.postId);
    if (req.query.threadId)
        if (req.query.threadId.toUpperCase() == "NULL")
            queryOptions.where.threadId = null;
        else
            queryOptions.where.threadId = parseInt(req.query.threadId);
    if (req.query.userId)
        queryOptions.where.userId = parseInt(req.query.userId);

    queryOptions.order = [
        ['createdAt', 'DESC']
    ];

    if (req.query.perPage) {
        queryOptions.limit = parseInt(req.query.perPage);
        if (req.query.page) {
            let page = parseInt(req.query.page)
            queryOptions.offset = (page - 1) * perPage;
        } else
            queryOptions.offset = 0;
    }

    queryOptions.raw = true;

    const posts = await Post.findAll(query);

    res.status(200).json({ status: "success", data: posts });
});

exports.getPost = catchAsyncErrors(async(req, res, next) => {
    const postId = parseInt(req.params.postId);
    const post = await Post.findByPk(postId);
    if (!post)
        return next(new ErrorHandler(404, "Post not found"));

    res.status(200).json({ status: "success", data: post });
});

exports.addPost = catchAsyncErrors(async(req, res, next) => {
    const creatorId = req.session.userId;
    const content = req.body.content;
    const threadId = req.body.threadId || null;
    const post = await Post.create({ creatorId: creatorId, threadId: threadId, content: content });
    res.status(201).json({
        status: "success",
        message: "Post added successfully",
        data: post
    });
})

exports.deletePost = catchAsyncErrors(async(req, res, next) => {
    const postId = parseInt(req.params.postId);
    const post = await Post.findByPk(postId);
    if (!post) {
        return next(new Error("Post not found"));
    }
    if (post.creatorId !== userId) {
        return next(new Error("You are not authorized to delete this post"));
    }
    res.status(200).json({
        status: "success",
        message: "Post deleted successfully"
    });
});