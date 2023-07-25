// models/Comment.js
console.log('models/Comment.js')
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    CommentUser: { type: String, required: true, },
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
    postSchemaId: { type: String, required: true, },
    userSchemaId: { type: String, required: true, },
    date: { type: Date, default: Date.now, },
},
    { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
