const mongoose = require('mongoose');

const flagsQuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    firstAnswer: {
        type: String,
        required: true
    },
    secondAnswer: {
        type: String,
        required: true
    },
    thirdAnswer: {
        type: String,
        required: true
    },
    fourthAnswer: {
        type: String,
        required: true
    },
    wrightAnswer: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('FlagQuestion', flagsQuestionSchema);

