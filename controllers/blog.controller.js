const httpStatus = require('http-status')
const pick = require('../utils/pick')
const catchAsync = require('../utils/catchAsync');
const { blogService } = require('../services');
const ApiError = require('../utils/ApiError');

const getAllBlogPost = catchAsync(async (req, res, next) => {
    const filter = pick(req.query, ['title', 'category', 'hidden', 'date']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await blogService.queryBlog(filter, options);
    res.status(httpStatus.FOUND).send(result);
})

const createBlog = catchAsync(async (req, res, next) => {
    const blog = await blogService.createBlog(req.body)
    if (!blog) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'An error occured')
    }
    res.status(httpStatus.CREATED).send(blog)
})

const makeChanges = catchAsync(async (req, res, next) => {
    const blog = await blogService.findBlogById(req.params.id)
    if (!blog) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Blog does not exist')
    }
    await blogService.updateBlog(req.params.id, req.body)
    res.status(httpStatus[200]).send(blog)
})
const deleteBlog = catchAsync(async (req, res, next) => {
    const blog = await blogService.findBlogById(req.params.id)
    if (!blog) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Blog does not exist')
    }
    await blogService.deleteById(req.params.id)
    res.status(httpStatus[200]).send(blog)
})
const getABlogById = catchAsync(async (req, res, next) => {
    const blog = await blogService.findBlogById(req.params.id)
    if (!blog) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Blog does not exist')
    }
    res.status(httpStatus[200]).send(blog)
})

module.exports = { getAllBlogPost, getABlogById, createBlog, makeChanges, deleteBlog }