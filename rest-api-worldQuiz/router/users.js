const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

const multer = require('multer');
const uploads = multer({ dest: 'C:\\Projects\\World Quiz React\\World-Quiz\\world-quiz-react\\rest-api-worldQuiz' });

router.get('/', authController.getAllUsers);
router.get('/profile', auth(), authController.getProfileInfo);
router.put('/profile', auth(), authController.editProfileInfo);
router.get('/profile/earnLive', auth(), authController.earnLive);
router.put('/profile/update', auth(), authController.updateUser);
router.post('/profile/fileUpload', uploads.single('file'), authController.fileUpload);

module.exports = router