const router = require('express').Router();
const users = require('./users');
const capitalsQuestion = require('./capitalsQuestion')
const flagsQuestion = require('./flagsQuestion');
const multer = require('multer');

const test = require('./test');
const { authController } = require('../controllers');

const uploads = multer({ dest: 'C:\\Projects\\World Quiz React\\World-Quiz\\world-quiz-react\\rest-api-worldQuiz' });

router.post('/register', uploads.single('file'), authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/capitals', capitalsQuestion);
router.use('/flags', flagsQuestion);
router.use('/test', test);

module.exports = router;
