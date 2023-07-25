// routes/comments.js
console.log('routes/Comment.js')
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

// Get all comments for a specific post

//get all comments
// router.get('/', async (req, res) => {
//     const username = req.query.user;
//     const catName = req.query.cat;
//     try {
//         let posts;
//         if (username) {
//             posts = await Post.find({ username });
//         } else if (catName) {
//             posts = await Post.find({
//                 categories: {
//                     $in: [catName],
//                 },
//             });
//         } else {
//             posts = await Post.find();
//         }
//         res.status(200).json(posts);
//     } catch (err) {
//         res.status(500).json(err);
//     }
//     // try {
//     //     const comments = await Comment.find({ postId: req.params.postId });
//     //     res.json(comments);
//     // } catch (err) {
//     //     res.status(500).json({ message: err.message });
//     // }
// });


//get comments on a post by its post id

//get comment by id
router.get('/:id', async (req, res) => {
    try {
        const comments = await Comment.find({ _id: req.params.id });
        if (comments.length === 0) return res.status(404).json({ message: "Comment not found" });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:postSchemaId', async (req, res) => {
    try {
        const comments = await Comment.find({ postSchemaId: req.params.postSchemaId });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Add a new comment to a post 
// and update the post and user
router.post('/', async (req, res) => {
    const comment = new Comment(req.body);
    console.log("\n\n\ncomment", comment)
    try {
        const savedComment = await comment.save();
        console.log("\n\n\nsavedComment", savedComment)
        const postId = savedComment.postSchemaId;
        console.log("\n\n\npostId in comment.js ", postId);

        const postRes = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: savedComment._id } },
            { new: true }
        );
        const userRes = await User.findByIdAndUpdate(savedComment.CommentUser, { $push: { comments: savedComment._id } }, { new: true });
        // res.status(201).json({ savedComment: savedComment, postRes: postRes, userRes: userRes });
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a comment and update the post and user
router.delete("/:id", async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            res.status(404).json({ message: "Comment not found" });
        } else {
            // Update post's comment array
            const post = await Post.findByIdAndUpdate(
                deletedComment.post,
                { $pull: { comments: deletedComment._id } },
                { new: true }
            );
            // Update user's comment array
            const user = await User.findByIdAndUpdate(
                deletedComment.user,
                { $pull: { comments: deletedComment._id } },
                { new: true }
            );
            res.status(200).json({
                message: "Comment deleted successfully",
                post,
                user,
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;

//comment schema 
/*
 name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    postSchemaId: {
        type: String,
        required: true,
    },
    userSchemaId: {
        type: String,
        required: true,
    },

*/