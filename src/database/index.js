const mongoose = require('mongoose');
const logger = require("../logger");
mongoose.Promise = global.Promise;

async function connectToDatabase() {
    try {
        const connectionString = process.env.DATABASE_URI;
        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 5000
        });
        logger.info('Connected to database');
    } catch (e) {
        logger.error(e);
    }
}

module.exports = connectToDatabase;