const express = require('express');
const passport = require('passport');
const router = express.Router();
const validate = require('../../middlewares/ validate')
const auth = require('../../middlewares/auth')
const { getAllUsers, createUser, getUserByEmail, getUserbyID, updateUserById, deleteUserById } = require('../../controllers/user.controller');
const { createVal, updateUser, getUser, getUsers, deleteUser } = require('../../validations/user.validation')

// Handle the /users endpoint
router.get('/', auth(), validate(getUsers), getAllUsers);
router.post('/', validate(createVal), createUser);
router.get('/:id', auth('getUsers'), validate(getUser), getUserbyID);
router.delete('/:id', auth('deleteUser'), validate(deleteUser), deleteUserById);
router.put('/:id', auth('manageUsers'), validate(updateUser), updateUserById);
router.route('/get-email').get(getUserByEmail);

module.exports = router;