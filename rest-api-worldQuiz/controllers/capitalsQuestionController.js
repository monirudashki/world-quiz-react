const { userModel } = require('../models');
const { capitalQuestionModel } = require('../models');

//TODO add function get questions for game..

async function getAllCapitalsQuestions(req, res, next) {

    const search = req.query.search;

    const page = req.query.page;

    const limit = 3;

    const skip = (page - 1) * limit;

    let result;

    if (!search) {
        result = await capitalQuestionModel.find({}).limit(limit).skip(skip);
    } else {
        result = await capitalQuestionModel.find({ title: { $regex: search, $options: 'i' } });
    }

    try {
        res.json(result);
    } catch (err) {
        next();
    }
}

async function getGameQuestions(req, res, next) {
    const questions = await capitalQuestionModel.find({});

    const questionsArray = [];
    const ignoreArray = [];

    while (questionsArray.length < 26) {
        const randomElement = questions[Math.floor(Math.random() * questions.length)];

        if (!ignoreArray.includes(randomElement._id)) {
            questionsArray.push(randomElement);
            ignoreArray.push(randomElement._id);
        }
    }

    try {
        res.json(questionsArray);
    } catch (err) {
        console.log(err);
    }
}

async function getCapitalQuestionById(req, res, next) {
    const { questionId } = req.params;

    const result = await capitalQuestionModel.findById(questionId);

    try {
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        next();
    }
}

async function createCapitalsQuestion(req, res, next) {
    const { title, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, wrightAnswer } = req.body;

    try {
        const capitalsQuestion = await capitalQuestionModel.create({
            title, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, wrightAnswer
        });

        return res.json(capitalsQuestion);
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            let field = err.message.split("index: ")[1];
            field = field.split(" dup key")[0];
            field = field.substring(0, field.lastIndexOf("_"));

            res.status(409)
                .send({ message: `This ${field} is already registered!` });
            return;
        }
        next();
    }
}

async function editCapitalQuestion(req, res, next) {
    const { questionId } = req.params;
    const { title, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, wrightAnswer } = req.body;

    const question = await capitalQuestionModel.findByIdAndUpdate({ _id: questionId }, {
        title: title,
        firstAnswer: firstAnswer,
        secondAnswer: secondAnswer,
        thirdAnswer: thirdAnswer,
        fourthAnswer: fourthAnswer,
        wrightAnswer: wrightAnswer
    }, { new: true });

    if (question) {
        res.status(200).json(question);
    }
    else {
        res.status(401).json({ message: `Not allowed!` });
        next();
    }
}

async function deleteCapitalQuestion(req, res, next) {
    const { questionId } = req.params;

    capitalQuestionModel.findOneAndDelete({ _id: questionId })
        .then(deleteOne => {
            if (deleteOne) {
                res.status(200).json(deleteOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

module.exports = {
    getAllCapitalsQuestions,
    getGameQuestions,
    getCapitalQuestionById,
    createCapitalsQuestion,
    editCapitalQuestion,
    deleteCapitalQuestion
}
