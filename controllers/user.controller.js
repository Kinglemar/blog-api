const httpStatus = require('http-status')
const pick = require('../utils/pick')
const catchAsync = require('../utils/catchAsync');
const { userService, emailService } = require('../services');
const ApiError = require('../utils/ApiError');


//Get Users

const getAllUsers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['username', 'email', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUsers(filter, options);
    res.status(httpStatus.FOUND).send(result);
})

// Get user by ID

const getUserbyID = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.id)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
    }
    res.status(httpStatus.FOUND).send(user)
})

//Get user by email

const getUserByEmail = catchAsync(async (req, res) => {
    const user = await userService.getUserByEmail(req.query?.email);
    res.status(200).send(user);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND)
    }
})

// Create User

const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
    if (user && verifyEmailToken) {
        await emailService.sendVerificationEmail(req.body.email, verifyEmailToken, req.body.first_name)
    }
    res.status(httpStatus.CREATED).send(user);
})

const createUserByGoogle = catchAsync(async (req, res) => {
    const user = await userService.addGoogleUser(req.body)
    res.status(httpStatus.CREATED).send(user);
})

//Update user

const updateUserById = catchAsync(async (req, res) => {
    const user = await userService.updateUserById(req.body)
    res.status(httpStatus.OK).send(user);
})

//Delete user by ID

const deleteUserById = catchAsync(async (req, res) => {
    const user = await userService.deleteUserById(req.params.id)
    res.status(httpStatus[200]).send(user);
})

module.exports = { getAllUsers, createUser, createUserByGoogle, getUserByEmail, getUserbyID, updateUserById, deleteUserById }