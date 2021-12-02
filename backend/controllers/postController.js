const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Comment } = require("../models/comment");
const { Post } = require("../models/post");
const { Reaction } = require("../models/reaction");
const { Thread } = require("../models/thread");
const ErrorHandler = require("../utils/errorHandler");


exports.getPost = catchAsyncErrors(async(req, res, next) => {
    const queryOptions = {};
    queryOptions.where = {};
    if (req.query.postId)
        queryOptions.where.postId = parseInt(req.query.postId);

    if (!req.query.threadId)
        queryOptions.where.threadId = null;
    else
        queryOptions.where.threadId = parseInt(req.query.threadId);
    if (req.query.userId)
        queryOptions.where.creatorId = parseInt(req.query.userId);

    queryOptions.order = [
        ['createdAt', 'DESC']
    ];

    if (req.query.perPage) {
        queryOptions.limit = parseInt(req.query.perPage);
        if (req.query.page) {
            let page = parseInt(req.query.page);
            queryOptions.offset = (page - 1) * perPage;
        } else
            queryOptions.offset = 0;
    }

    queryOptions.nest = true;
    queryOptions.raw = true;

    const posts = await Post.findAll(queryOptions);

    if (req.query.postId)
        for (let i = 0; i < posts.length; i++) {
            posts[i].Comments = await Comment.findAll({
                where: { postId: posts[i].postId },
                order: [
                    ['createdAt', 'ASC']
                ],
                raw: true
            });
            posts[i].Upvotes = await Reaction.findAll({ where: { postId: posts[i].postId, reactionType: 'upvote' }, raw: true });
            posts[i].Downvotes = await Reaction.findAll({ where: { postId: posts[i].postId, reactionType: 'downvote' }, raw: true });
        }

    res.status(200).json({ success: true, data: posts });
});


exports.addPost = catchAsyncErrors(async(req, res, next) => {
    const creatorId = req.session.userId;
    const content = req.body.content;
    if (content == null || content == '')
        return next(new ErrorHandler(400, "Content is required"));
    const threadId = req.body.threadId || null;
    let relatedImage = null;
    if (req.file) relatedImage = req.file.filename;
    await Post.create({ creatorId: creatorId, threadId: threadId, content: content, relatedImage: relatedImage });
    if (threadId != null)
        await Thread.findByPk(threadId).then(async(thread) => {
            thread.changed('updatedAt', true);
            await thread.save();
        });

    res.status(201).json({
        success: true,
        message: "Post added successfully",
    });
})

exports.deletePost = catchAsyncErrors(async(req, res, next) => {
    const postId = parseInt(req.query.postId);
    const post = await Post.findByPk(postId);
    if (!post) {
        return next(new Error("Post not found"));
    }
    if (post.creatorId !== req.session.userId) {
        return next(new Error("You are not authorized to delete this post"));
    }
    await post.destroy();
    res.status(200).json({
        success: true,
        message: "Post deleted successfully"
    });
});

exports.addComment = catchAsyncErrors(async(req, res, next) => {
    const postId = req.body.postId;
    if (postId == null)
        return next(new ErrorHandler(400, "PostId is required"));
    const creatorId = req.session.userId;
    const content = req.body.content;
    if (content == null)
        return next(new ErrorHandler(400, "Content is required"));

    await Comment.create({ postId: postId, creatorId: creatorId, content: content });
    res.status(201).json({
        success: true,
        message: "Comment added successfully"
    });
});

exports.addReaction = catchAsyncErrors(async(req, res, next) => {
    const postId = req.body.postId;
    if (postId == null)
        return next(new ErrorHandler(400, "PostId is required"));
    const userId = req.session.userId;
    const reactionType = req.body.reactionType;
    if (reactionType == null)
        return next(new ErrorHandler(400, "Reaction Type is required"));
    if (reactionType !== "upvote" && reactionType !== "downvote" && reactionType !== "report")
        return next(new ErrorHandler(400, "Invalid reaction type"));

    await Reaction.create({ postId: postId, userId: userId, reactionType: reactionType });
    res.status(201).json({
        success: true,
        message: "Reaction added successfully"
    });
});