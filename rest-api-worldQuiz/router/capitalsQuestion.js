const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { capitalsQuestionController } = require('../controllers');

// middleware that is specific to this router

router.get('/', capitalsQuestionController.getAllCapitalsQuestions);
router.get('/gameQuestions', capitalsQuestionController.getGameQuestions)
router.get('/:questionId', capitalsQuestionController.getCapitalQuestionById);
router.post('/', auth(), capitalsQuestionController.createCapitalsQuestion);
router.put('/:questionId/edit', auth(), capitalsQuestionController.editCapitalQuestion);
router.delete('/:questionId/delete', auth(), capitalsQuestionController.deleteCapitalQuestion);

module.exports = router