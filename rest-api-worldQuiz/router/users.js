const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.get('/', authController.getAllUsers);
router.get('/profile', auth(), authController.getProfileInfo);
router.put('/profile', auth(), authController.editProfileInfo);
router.get('/profile/earnLive', auth(), authController.earnLive);
router.put('/profile/update', auth(), authController.updateUser)

module.exports = router