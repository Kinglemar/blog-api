const express = require('express')
const router = express.Router()
const validate = require('../../middlewares/ validate')
const auth = require("../../middlewares/auth")
const { getAllBlogPost, getABlogById, createBlog, makeChanges, deleteBlog } = require('../../controllers/blog.controller')
const { addBlog, updateBlog, getBlogs, getBlogById, deleteById } = require('../../validations/blog.validation')

router.get('/', validate(getBlogs), getAllBlogPost)
router.post('/', validate(addBlog), createBlog)
router.delete('/:id', auth('blog'), validate(deleteById), deleteBlog)
router.get('/:id', auth('blog'), validate(getBlogById), getABlogById)
router.put('/:id', validate(updateBlog), makeChanges)
module.exports = router