const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins');

const blogSchema = new mongoose.Schema(
    {
        title: {
            required: true,
            type: String,
            trim: true
        },
        author: {
            required: true,
            type: String,
            trim: true
        },
        body: {
            type: String,
            required: true
        },
        category: {
            required: true,
            type: String,
            trim: true
        },
        comments: [{ user: String, body: String, date: Date }],
        date: { type: Date, default: Date.now },
        hidden: Boolean,
        _meta: {
            votes: Number,
            likes: Number
        }
    }
)

blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

