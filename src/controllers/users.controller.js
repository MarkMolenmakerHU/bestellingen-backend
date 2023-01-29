const {errorHandler} = require("../util");
const models = require("../models");
const {HttpError} = require("../error");

const me = errorHandler(async (req, res) => {
    const userDoc = await models.User.findById(req.userId).exec();
    if (!userDoc) {
        throw new HttpError(400, 'User not found');
    }
    return userDoc;
});

const users = errorHandler(async (req, res) => {
    return await models.User.find().exec();
});

const user = errorHandler(async (req, res) => {
    const userDoc = await models.User.findById(req.params.id).exec();
    if (!userDoc) {
        throw new HttpError(400, 'User not found');
    }
    return userDoc;
});

module.exports = {
    me,
    users,
    user
};