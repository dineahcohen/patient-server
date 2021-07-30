const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isDoctor: {
        type: Boolean,
        required: true,
        default: false
    },
    ip: {
        type: String,
        required: true
    }

}, {
    collection: 'users'
})

userSchema.plugin(uniqueValidator, { message: 'Email already exist' });

module.exports = mongoose.model('User', userSchema);