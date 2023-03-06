const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { flagsQuestionController } = require('../controllers');

router.get('/', flagsQuestionController.getAllFlagsQuestions);
router.get('/gameQuestions', flagsQuestionController.getGameFlagsQuestions)
router.get('/:questionId', flagsQuestionController.getFlagsQuestionById);
router.post('/', auth(), flagsQuestionController.createFlagsQuestion);
router.put('/:questionId/edit', auth(), flagsQuestionController.editFlagsQuestion);
router.delete('/:questionId/delete', auth(), flagsQuestionController.deleteFlagsQuestion);

module.exports = router;