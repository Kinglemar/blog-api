const httpStatus = require('http-status');
const { Blog } = require('../models');
const ApiError = require('../utils/ApiError');

const queryBlog = async (filter, options) => {
    return await Blog.paginate(filter, options)
}

/**
 * Create a blog
 * @param {Object} blog
 * @returns {Promise<Blog>}
 */
const createBlog = async (blog) => {
    return await Blog.create(blog)
}

/**
 * Update a blog
 * @param {Object} blog
 * @returns {Promise<Blog>}
 */

const updateBlog = async (id, blogBody) => {
    const blog = await Blog.findById(id)
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Blog does not exist.')
    }

    Object.assign(blog, blogBody)
    blog.save();
    return blog;
}

/**
 * Find a blog by ID
 * @param {String} id
 * @returns {Promise<Blog>}
 */

const findBlogById = async (id) => {
    return Blog.findById(id)
}

/**
 * Delete a blog by ID
 * @param {String} id
 * @returns {Promise<Blog>}
 */

const deleteById = async (id) => {
    const blog = await Blog.findById(id)
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Blog does not exist')
    }
    await blog.remove()
    return blog;
}

module.exports = { createBlog, queryBlog, updateBlog, findBlogById, deleteById }