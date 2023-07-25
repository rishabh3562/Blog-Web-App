const app = require('express')
const router = app.Router();
const User = require('../models/User');
const Post = require('../models/Post')
const bcrypt = require('bcryptjs');
console.log(`new user.js`);
// app.use(express.json());
// Register new user

//UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User not found!");
        }
    } else {
        res.status(401).json("You can delete only your account!");
    }
});

//GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET USER for context password is removed
router.get("/:id/locked", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});
//Get User for comment
//GET USER for context password is removed
router.get("/comment/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password -email -posts -profilePicture -createdAt -updatedAt -comments -__v -categories -_id');
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});
//whenever axios hit this endpoint with postid, postid
//  gets into post array
router.post('/:userId/posts', async (req, res) => {
    const { userId } = req.params;
    const { postId } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { posts: postId } },
            { new: true } // Return the updated document
        );
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
// GET a user's posts
router.get("/:id/posts", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts");
        res.status(200).json(user.posts);
    } catch (err) {
        res.status(500).json(err);
    }
});






module.exports = router;
