const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        photo: { type: String, required: false },
        //post kis user ki hai👇👇
        username: { type: String, required: true, unique: true },
        categories: { type: Array, default: [], required: false },
        comments: { type: Array, default: [] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);