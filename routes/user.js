const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

router.get('/JSON/user', userController.getAllUsers);
router.post('/user', userController.postUser);

router.get('/JSON/user/:id', userController.getFilteredUser);
router.put('/user/:id', userController.putUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;