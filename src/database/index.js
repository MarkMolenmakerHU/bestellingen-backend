const mongoose = require('mongoose');
const logger = require("../logger");
mongoose.Promise = global.Promise;

async function connectToDatabase() {
    try {
        const password = process.env.DB_PASS;
        const connectionString = `mongodb+srv://backend:${password}@bestellingen-cluster.xxmmy54.mongodb.net/?retryWrites=true&w=majority`;
        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 5000
        });
        logger.info('Connected to database');
    } catch (e) {
        logger.error(e);
    }
}

module.exports = connectToDatabase;