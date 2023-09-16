const Joi = require('joi')

const addBlog = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().required(),
        body: Joi.string().required(),
        category: Joi.string().required()
    })
}

const getBlogs = {
    query: Joi.object().keys({
        title: Joi.string(),
        category: Joi.string(),
        hidden: Joi.boolean(),
        date: Joi.date(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const updateBlog = {
    params: Joi.object().keys({
        id: Joi.string().required()
    }),
    body: Joi.object().keys({
        title: Joi.string().required().length(3),
        author: Joi.string().required(),
        body: Joi.string().required(),
        category: Joi.string().required()
    })
}

const getBlogById = {
    params: Joi.object().keys({
        id: Joi.string().required()
    }),
}

const deleteById = {
    params: Joi.object().keys({
        id: Joi.string().required()
    }),
}


module.exports = {
    addBlog, getBlogs, updateBlog, getBlogById, deleteById
}