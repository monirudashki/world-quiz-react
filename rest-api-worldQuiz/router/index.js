const router = require('express').Router();
const users = require('./users');
const capitalsQuestion = require('./capitalsQuestion')
const flagsQuestion = require('./flagsQuestion');

//TODO add correct required
const test = require('./test');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/capitals', capitalsQuestion);
router.use('/flags', flagsQuestion);
router.use('/test', test);

module.exports = router;
