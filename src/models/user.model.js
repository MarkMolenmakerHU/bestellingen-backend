const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {type: String, unique: true},
    firstname: {type: String, unique: false},
    lastname: {type: String, unique: false},
    role: {type: String, unique: false},
    password: {type: String, select: false}
});

const User = model('User', userSchema);

module.exports = User;