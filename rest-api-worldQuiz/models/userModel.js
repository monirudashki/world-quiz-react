const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Username should be at least 3 characters'],
    },
    imageUrl: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minlength: [3, 'Password should be at least 5 characters'],
    },
    lastFiveGames: {
        type: [Number], default: [0, 0, 0, 0, 0]
    },
    lives: {
        type: Number, default: 5
    },
    coins: {
        type: Number,
        default: 5000
    },
    level: {
        type: Number,
        default: 1
    },
    wrightAnswers: {
        type: Number,
        default: 0
    },
    roles: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: { createdAt: 'created_at' } });

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                }
                this.password = hash;
                next();
            })
        })
        return;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
