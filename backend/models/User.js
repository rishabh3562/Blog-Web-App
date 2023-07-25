const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, },
        email: { type: String, required: true, unique: true, },
        password: { type: String, required: true, },
        profilePic: { type: String, default: "", },
        posts: { type: Array, default: [], },
        comments: { type: Array, default: [] },
        categories: { type: Array, default: [], }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);