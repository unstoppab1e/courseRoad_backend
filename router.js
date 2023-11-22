const { Router } = require('express');
const router = new Router();
const userController = require('./controllers/userController');
const User = require('./models/user-model');

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getOneUser);

router.post('/signin', userController.signIn);
router.post('/signup', userController.signUp);
router.get('/activate/:link', userController.activate);

module.exports = router;
