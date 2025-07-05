const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, updateUser } = require('../controllers/userController');
const { createProfile } = require('../controllers/profileController');


router.post('/register', register);
router.post('/login', login);
router.post('/users', getAllUsers);
router.post('/users/profile', createProfile);
router.put('/users/:id', updateUser);

module.exports = router;
