const app = require('express')
const router = app.Router();
const User = require('../models/User');
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const bcrypt = require('bcryptjs');
console.log(`new post.js`);
// app.use(express.json());
// Register new user

//Create Post (Crud)
router.post("/postsByIds", async (req, res) => {
    const { postIds } = req.body;

    try {
        const posts = await Post.find({ _id: { $in: postIds } }).select('-__v').sort({ updatedAt: 'desc', createdAt: 'desc' }).limit(5);

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

//simple post creation for blog page
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    console.log(`newPost`, newPost);
    try {
        const savedPost = await newPost.save();
        console.log(`saved post`, savedPost);
        res.status(200).json(savedPost);

    } catch (err) {
        res.status(500).json(err);
    }
});

//GET Post (cRud)
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET all Posts
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


//UPDATE Post(crUd)
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//DELETE Post(cruD)
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(`post :`, post);
        console.log(`\n\n\npost.username === req.body.username :`, post.username === req.body.username);
        console.log(`\n\n\nreq.body :`, req.body);

        if (post.username === req.body.username) {
            try {
                await post.deleteOne({ _id: req.params.id });
                res.status(200).json("Post has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//get user posts
router.post("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.Id);
        const postIds = user.posts;
        const posts = await Post.find({ _id: { $in: postIds } });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


///posts/${postId}/comments
router.get("/comments/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const commentIds = post.comments;
        const comments = await Comment.find({ _id: { $in: commentIds } });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// try {
//     const post = await Post.findById(req.params.postId);
//     console.log("\n\n\npost in posts.js", post)
//     const commentIds = post.comments;
//     console.log("\n\n\commentIds in posts.js", commentIds)
//     const comments = await Comment.find({ _id: { $in: commentIds } });
//     console.log("\n\n\comments in posts.js", comments)
//     res.status(200).json(comments);
// } catch (err) {
//     res.status(500).json(err);
// }
// });


// router.get("/:postId/comments", async (req, res) => {
//     try {
//         const comments = await Comment.find({ postId: req.params.postId });
//         res.json(comments);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });





module.exports = router;
