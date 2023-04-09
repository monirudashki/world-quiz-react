const {
    userModel,
    tokenBlacklistModel
} = require('../models');

const utils = require('../utils');
const { authCookieName } = require('../app-config');

const bsonToJson = (data) => { return JSON.parse(JSON.stringify(data)) };
const removePassword = (data) => {
    const { password, __v, ...userData } = data;
    return userData
}

const fs = require('fs');
const readLine = require('readline');
const { google } = require('googleapis');

async function register(req, res, next) {

    const file = req.file;

    const KEYFILEPATH = './worldquizgames-e535671d2db5.json';

    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES
    });

    async function createAndUploadFile(auth) {

        const driveService = google.drive({ version: 'v3', auth });

        let fileMetaData = {
            'name': file.filename,
            'parents': ['1e9Y0QAl7f90vJxMfYoDVKK0AqPm_Ax9A']
        }

        let media = {
            mimeType: file.mimetype,
            body: fs.createReadStream(file.path)
        }

        let response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        });

        switch (response.status) {
            case 200:
                return response.data.id;
                break;
            default:
                return console.error(response.error);
                break;
        };

    }
    const id = await createAndUploadFile(auth).catch(console.error);

    const imageUrl = `https://drive.google.com/uc?export=view&id=${id}`

    const { email, username, password, repeatPassword } = req.body;

    try {
        let createdUser = await userModel.create({ email, username, password, imageUrl });
        createdUser = bsonToJson(createdUser);
        createdUser = removePassword(createdUser);

        const token = utils.jwt.createToken({ id: createdUser._id });
        if (process.env.NODE_ENV === 'production') {
            res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true });
        } else {
            res.cookie(authCookieName, token, { httpOnly: true });
        }
        res.status(200)
            .send(createdUser);
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            let field = err.message.split("index: ")[1];
            field = field.split(" dup key")[0];
            field = field.substring(0, field.lastIndexOf("_"));

            res.status(409)
                .send({ message: `This ${field} is already registered!` });
            return;
        }
        next(err);
    }
}

function login(req, res, next) {
    const { email, password } = req.body;

    userModel.findOne({ email })
        .then(user => {
            return Promise.all([user, user ? user.matchPassword(password) : false]);
        })
        .then(([user, match]) => {
            if (!match) {
                res.status(401)
                    .send({ message: 'Wrong email or password' });
                return
            }
            user = bsonToJson(user);
            user = removePassword(user);

            const token = utils.jwt.createToken({ id: user._id });

            if (process.env.NODE_ENV === 'production') {
                res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
            } else {
                res.cookie(authCookieName, token, { httpOnly: true });
            }
            res.status(200)
                .send(user);
        })
        .catch(next);
}

function logout(req, res) {
    const token = req.cookies[authCookieName];

    tokenBlacklistModel.create({ token })
        .then(() => {
            res.clearCookie(authCookieName)
                .status(204)
                .send({ message: 'Logged out!' });
        })
        .catch(err => res.send(err));
}

function getProfileInfo(req, res, next) {
    const { _id: userId } = req.user;

    userModel.findOne({ _id: userId }, { password: 0, __v: 0 }) //finding by Id and returning without password and __v
        .then(user => { res.status(200).json(user) })
        .catch(next);
}

function editProfileInfo(req, res, next) {
    const { _id: userId } = req.user;
    const { username, email, imageUrl } = req.body;

    userModel.findOneAndUpdate({ _id: userId }, { username, email, imageUrl }, { runValidators: true, new: true })
        .then(x => { res.status(200).json(x) })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                let field = err.message.split("index: ")[1];
                field = field.split(" dup key")[0];
                field = field.substring(0, field.lastIndexOf("_"));

                res.status(409)
                    .send({ message: `This ${field} is already registered!` });
                return;
            }
            next();
        });
}

async function getAllUsers(req, res, next) {
    const page = req.query.page;

    const limit = 5;

    const skip = (page - 1) * limit;

    const count = await userModel.find({ roles: 'user' });
    const countLength = count.length;
    const users = await userModel.find({ roles: 'user' }).sort({ coins: -1 }).limit(limit).skip(skip);

    const result = {
        'count': countLength,
        'users': users
    }

    try {
        res.json(result);
    } catch (err) {
        next();
    }
}

async function earnLive(req, res, next) {
    const { _id: userId } = req.user;

    const user = await userModel.findById({ _id: userId });

    user.lives = Number(user.lives) + 1;
    await user.save();

    try {
        res.json(user);
    } catch (err) {
        console.log(err);
    }
}

async function updateUser(req, res, next) {
    const { _id: userId } = req.user;

    const { lastFiveGames, lives, coins, correctAnswers, level } = req.body;
    const wrightAnswers = correctAnswers;

    userModel.findOneAndUpdate({ _id: userId }, { lastFiveGames, lives, coins, wrightAnswers, level }, { runValidators: true, new: true })
        .then(x => { res.status(200).json(x) })
        .catch(err => {
            console.log(err);
            next();
        });
}

async function fileUpload(req, res, next) {

    const file = req.file;

    const KEYFILEPATH = './worldquizgames-e535671d2db5.json';

    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES
    });

    async function createAndUploadFile(auth) {

        const driveService = google.drive({ version: 'v3', auth });

        let fileMetaData = {
            'name': file.filename,
            'parents': ['1e9Y0QAl7f90vJxMfYoDVKK0AqPm_Ax9A']
        }

        let media = {
            mimeType: file.mimetype,
            body: fs.createReadStream(file.path)
        }

        let response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        });

        switch (response.status) {
            case 200:
                res.json({ id: response.data.id });
                break;

            default:
                console.error(response.error);
                break;
        };

    }
    createAndUploadFile(auth).catch(console.error);

    //TODO find way to return existing photo , not create a new one
}

module.exports = {
    login,
    register,
    logout,
    getProfileInfo,
    editProfileInfo,
    getAllUsers,
    earnLive,
    updateUser,
    fileUpload
}
