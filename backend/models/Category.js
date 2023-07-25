const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },

        image: { type: Buffer, default: "" },
        imageUrl: { type: String, default: "" },
        description: { type: String, default: "" },
        posts: { type: Array, default: [] },
        comments: { type: Array, default: [] }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);