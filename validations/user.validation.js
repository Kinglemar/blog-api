const Joi = require('joi')

const createVal = {
    body: Joi.object().keys({
        username: Joi.string(),
        full_name: Joi.string().length(5),
        email: Joi.string().email().required(),
        password: Joi.string()
    })
}

const updateUser = {
    params: Joi.object().keys({
        id: Joi.string()
    }),
    body: Joi.object().keys({
        username: Joi.string(),
        full_name: Joi.string().length(5),
        email: Joi.string().email().required(),
        password: Joi.string()
    })
}

const getUsers = {
    query: Joi.object().keys({
        username: Joi.string(),
        email: Joi.string().email(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getUser = {
    params: Joi.object().keys({
        id: Joi.string()
    }),
}
const deleteUser = {
    params: Joi.object().keys({
        id: Joi.string()
    }),
}



module.exports = { createVal, updateUser, getUser, getUsers, deleteUser }